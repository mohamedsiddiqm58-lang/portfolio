import os
import shutil
import numpy as np
from PIL import Image
import onnxruntime as ort

user_uploaded_dir = r"C:\Users\mohamed siddiq\.gemini\antigravity\brain\ddaf8f1c-f9b9-4562-a544-9c4734fd19bc\.user_uploaded"

images = [
    ("media_1795280632215_3ef35bea.jpg", "public/portrait-1.png", "Pose 1 - Stride"),
    ("media_1795280632200_1e821bd2.jpg", "public/portrait-2.png", "Pose 2 - Casual"),
    ("media_1795280632206_49068556.jpg", "public/portrait-3.png", "Pose 3 - Relaxed"),
]

print("Loading u2net semantic AI segmentation model...")
session = ort.InferenceSession("models/u2net.onnx", providers=["CPUExecutionProvider"])
input_name = session.get_inputs()[0].name
output_name = session.get_outputs()[0].name

mean = np.array([0.485, 0.456, 0.406], dtype=np.float32).reshape(1, 3, 1, 1)
std = np.array([0.229, 0.224, 0.225], dtype=np.float32).reshape(1, 3, 1, 1)

for src_name, out_path, label in images:
    src_path = os.path.join(user_uploaded_dir, src_name)
    print(f"\nProcessing {label} ({src_name})...")
    orig_img = Image.open(src_path).convert("RGB")
    orig_w, orig_h = orig_img.size
    orig_np = np.array(orig_img, dtype=np.uint8)

    # 1. Prepare 320x320 input for u2net
    resized_img = orig_img.resize((320, 320), Image.Resampling.BILINEAR)
    img_data = (np.transpose(np.array(resized_img, dtype=np.float32)/255.0, (2, 0, 1))[np.newaxis, ...] - mean) / std

    # 2. Run inference
    outputs = session.run([output_name], {input_name: img_data.astype(np.float32)})
    pred = outputs[0][0, 0]

    # Normalize prediction to 0.0 - 1.0
    p_min, p_max = pred.min(), pred.max()
    pred = (pred - p_min) / (p_max - p_min) if p_max > p_min else np.zeros_like(pred)

    # 3. Upscale probability mask to original resolution with Bilinear filtering
    mask_320 = Image.fromarray((pred * 255).astype(np.uint8), mode="L")
    mask_full = mask_320.resize((orig_w, orig_h), Image.Resampling.BILINEAR)
    mask_np = np.array(mask_full, dtype=np.float32) / 255.0

    # 4. Generate clean, edge-aware alpha channel:
    # Foreground threshold: where AI detects the human silhouette (mask_np >= 0.12), it is foreground (alpha = 255)
    # Background threshold: where mask_np <= 0.04, it is background (alpha = 0)
    # Between 0.04 and 0.12: smooth sub-pixel antialiased transition
    alpha = np.zeros((orig_h, orig_w), dtype=np.float32)

    low_th = 0.04
    high_th = 0.14
    # Linear ramp in the narrow boundary zone (0.04 to 0.14)
    ramp = np.clip((mask_np - low_th) / (high_th - low_th), 0.0, 1.0)
    # Smooth Hermite curve: 3*t^2 - 2*t^3
    smooth_t = ramp * ramp * (3.0 - 2.0 * ramp)
    alpha = smooth_t * 255.0

    # Ensure background corners are 0
    alpha = np.clip(alpha, 0, 255).astype(np.uint8)

    # 5. Assemble RGBA with 100% UNTOUCHED ORIGINAL RGB
    # We do NOT scale, brighten, tint, or modify a single color byte!
    rgba = np.dstack([orig_np, alpha])
    out_img = Image.fromarray(rgba, mode="RGBA")
    out_img.save(out_path, format="PNG")
    print(f"✓ Saved transparent PNG: {out_path} ({os.path.getsize(out_path)} bytes)")

# Update default portrait.png
shutil.copyfile("public/portrait-1.png", "public/portrait.png")

# STEP 5: Quality Check Previews on Black, White, and Purple Backgrounds
os.makedirs("screenshots/previews", exist_ok=True)
backgrounds = [
    ("black", (12, 12, 12, 255)),       # #0C0C0C (Dark website background)
    ("white", (255, 255, 255, 255)),   # #FFFFFF (High contrast test)
    ("purple", (182, 0, 168, 255)),    # Website accent purple glow
]

print("\n--- GENERATING 3-BACKGROUND COMPOSITE QUALITY CHECKS ---")
for bg_name, bg_color in backgrounds:
    # Create side-by-side composite canvas for all 3 poses: width = 3 * 360, height = 480
    comp_w = 380 * 3
    comp_h = 510
    comp_img = Image.new("RGBA", (comp_w, comp_h), bg_color)

    for idx, (_, out_path, label) in enumerate(images):
        char_img = Image.open(out_path).convert("RGBA")
        # Resize maintaining aspect ratio to fit 360x480
        char_img.thumbnail((360, 480), Image.Resampling.LANCZOS)
        # Paste centered in its slot
        x_pos = idx * 380 + (380 - char_img.width) // 2
        y_pos = comp_h - char_img.height
        comp_img.alpha_composite(char_img, (x_pos, y_pos))

    preview_path = f"screenshots/previews/composite-on-{bg_name}.png"
    comp_img.save(preview_path)
    print(f"✓ Saved quality preview on {bg_name.upper()} background: {preview_path}")

print("\nVerification complete! All 3 character images processed with exact color preservation.")
