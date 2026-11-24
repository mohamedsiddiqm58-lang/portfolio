import os
import shutil
import numpy as np
from PIL import Image
import onnxruntime as ort

user_uploaded_dir = r"C:\Users\mohamed siddiq\.gemini\antigravity\brain\ddaf8f1c-f9b9-4562-a544-9c4734fd19bc\.user_uploaded"

images = [
    ("media_1795280632215_3ef35bea.jpg", "public/portrait-1.png"),
    ("media_1795280632200_1e821bd2.jpg", "public/portrait-2.png"),
    ("media_1795280632206_49068556.jpg", "public/portrait-3.png"),
]

print("Initializing u2net AI Inference Session...")
session = ort.InferenceSession("models/u2net.onnx", providers=["CPUExecutionProvider"])
input_name = session.get_inputs()[0].name
output_name = session.get_outputs()[0].name

mean = np.array([0.485, 0.456, 0.406], dtype=np.float32).reshape(1, 3, 1, 1)
std = np.array([0.229, 0.224, 0.225], dtype=np.float32).reshape(1, 3, 1, 1)

for src_name, out_path in images:
    src_path = os.path.join(user_uploaded_dir, src_name)
    if not os.path.exists(src_path):
        src_path = out_path

    print(f"\nProcessing {src_name}...")
    orig_img = Image.open(src_path).convert("RGB")
    orig_w, orig_h = orig_img.size

    # Resize to 320x320 for u2net input
    resized_img = orig_img.resize((320, 320), Image.Resampling.BILINEAR)
    img_data = np.array(resized_img, dtype=np.float32) / 255.0
    # transpose from (H, W, C) to (C, H, W)
    img_data = np.transpose(img_data, (2, 0, 1))
    img_data = np.expand_dims(img_data, axis=0)
    # Normalize with ImageNet mean and std
    img_data = (img_data - mean) / std

    # Run AI inference
    outputs = session.run([output_name], {input_name: img_data})
    pred = outputs[0][0, 0]

    # Normalize prediction to 0.0 - 1.0
    p_min, p_max = pred.min(), pred.max()
    if p_max > p_min:
        pred = (pred - p_min) / (p_max - p_min)
    else:
        pred = np.zeros_like(pred)

    # Convert to 8-bit mask and upscale back to original dimensions
    mask_320 = Image.fromarray((pred * 255).astype(np.uint8), mode="L")
    mask_full = mask_320.resize((orig_w, orig_h), Image.Resampling.BILINEAR)

    # Refine mask:
    # 1. Pure solid black background in original image (where R=0,G=0,B=0) should be transparent
    # 2. Inside the character silhouette, even if hair or clothes are dark, the AI detects it as foreground!
    orig_np = np.array(orig_img, dtype=np.uint8)
    mask_np = np.array(mask_full, dtype=np.float32) / 255.0

    # Smooth thresholding: foreground certainty
    # Where mask > 0.6, full opacity (255)
    # Where mask < 0.1, full transparent (0)
    # Between 0.1 and 0.6, smooth cosine/smoothstep antialiasing
    smooth_alpha = np.zeros_like(mask_np)
    # Smoothstep: 3*x^2 - 2*x^3
    t = np.clip((mask_np - 0.15) / (0.65 - 0.15), 0.0, 1.0)
    smooth_alpha = t * t * (3.0 - 2.0 * t)

    # For pixels where original image is pure black background (luminance == 0) and mask < 0.4, force 0
    lum = orig_np.mean(axis=2)
    pure_black = lum < 3
    smooth_alpha[pure_black & (mask_np < 0.35)] = 0.0

    alpha_channel = (smooth_alpha * 255).astype(np.uint8)

    # Assemble RGBA with 100% UNTOUCHED ORIGINAL RGB
    # We DO NOT alter a single RGB value!
    rgba = np.dstack([orig_np, alpha_channel])
    out_img = Image.fromarray(rgba, mode="RGBA")

    out_img.save(out_path, format="PNG")
    print(f"✓ Saved transparent PNG: {out_path} ({os.path.getsize(out_path)} bytes)")

shutil.copyfile("public/portrait-1.png", "public/portrait.png")
print("\nAll 3 images processed with state-of-the-art semantic AI matting!")
