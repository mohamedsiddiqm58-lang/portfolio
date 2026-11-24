import os
import shutil
from PIL import Image

user_uploaded_dir = r"C:\Users\mohamed siddiq\.gemini\antigravity\brain\ddaf8f1c-f9b9-4562-a544-9c4734fd19bc\.user_uploaded"

images = [
    ("media_1795280632215_3ef35bea.jpg", "public/portrait-1.png"),
    ("media_1795280632200_1e821bd2.jpg", "public/portrait-2.png"),
    ("media_1795280632206_49068556.jpg", "public/portrait-3.png"),
]

try:
    import rembg
    print("Using rembg neural matting...")
    for src_name, out_path in images:
        src_path = os.path.join(user_uploaded_dir, src_name)
        if not os.path.exists(src_path):
            src_path = out_path
        print(f"Processing {src_path} -> {out_path}...")
        img = Image.open(src_path)
        result = rembg.remove(img)
        result.save(out_path, format="PNG")
        print(f"✓ Saved {out_path} with alpha channel ({os.path.getsize(out_path)} bytes)")

    shutil.copyfile("public/portrait-1.png", "public/portrait.png")
    print("✓ All 3 transparent PNGs created successfully!")
except Exception as e:
    print(f"Error during rembg processing: {e}")
    sys.exit(1)
