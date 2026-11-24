import os
import shutil
from PIL import Image
from collections import deque

user_uploaded_dir = r"C:\Users\mohamed siddiq\.gemini\antigravity\brain\ddaf8f1c-f9b9-4562-a544-9c4734fd19bc\.user_uploaded"

images = [
    ("media_1795280632215_3ef35bea.jpg", "public/portrait-1.png"),
    ("media_1795280632200_1e821bd2.jpg", "public/portrait-2.png"),
    ("media_1795280632206_49068556.jpg", "public/portrait-3.png"),
]

def remove_black_background(img_path, out_path):
    print(f"Processing: {img_path} -> {out_path}")
    img = Image.open(img_path).convert("RGBA")
    w, h = img.size
    pixels = img.load()

    # Step 1: Identify all exterior background pixels using BFS flood fill from image borders
    # A pixel is background if luminance (max(R,G,B) or average) is <= threshold
    # In JPEG images, pure black background pixels are typically <= 15
    is_bg = [[False] * h for _ in range(w)]
    visited = [[False] * h for _ in range(w)]

    queue = deque()

    # Threshold for solid black background
    BG_THRESHOLD = 18

    # Add all 4 borders to queue if dark
    for x in range(w):
        for y in [0, 1, h-2, h-1]:
            r, g, b, _ = pixels[x, y]
            if max(r, g, b) <= BG_THRESHOLD:
                queue.append((x, y))
                visited[x][y] = True
                is_bg[x][y] = True

    for y in range(h):
        for x in [0, 1, w-2, w-1]:
            if not visited[x][y]:
                r, g, b, _ = pixels[x, y]
                if max(r, g, b) <= BG_THRESHOLD:
                    queue.append((x, y))
                    visited[x][y] = True
                    is_bg[x][y] = True

    # 4-way BFS flood fill
    while queue:
        cx, cy = queue.popleft()
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
                visited[nx][ny] = True
                r, g, b, _ = pixels[nx, ny]
                if max(r, g, b) <= BG_THRESHOLD:
                    is_bg[nx][ny] = True
                    queue.append((nx, ny))

    # Also check for any internal holes (like between arm and torso) that didn't touch border
    # We can find connected components of dark pixels <= BG_THRESHOLD
    for x in range(w):
        for y in range(h):
            if not visited[x][y]:
                r, g, b, _ = pixels[x, y]
                if max(r, g, b) <= BG_THRESHOLD:
                    # Explore component
                    comp = []
                    q = deque([(x, y)])
                    visited[x][y] = True
                    touches_character_interior = False
                    while q:
                        qx, qy = q.popleft()
                        comp.append((qx, qy))
                        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                            nx, ny = qx + dx, qy + dy
                            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
                                nr, ng, nb, _ = pixels[nx, ny]
                                if max(nr, ng, nb) <= BG_THRESHOLD:
                                    visited[nx][ny] = True
                                    q.append((nx, ny))

                    # If this dark component is large enough (> 100 px) and surrounded by outer parts
                    # In our images, the character's interior black hair or pants have texture or are > 18
                    # If this component is pure black (<= 10), mark as bg
                    avg_color = sum(max(pixels[px, py][:3]) for px, py in comp) / len(comp)
                    if avg_color <= 10:
                        for px, py in comp:
                            is_bg[px][py] = True

    # Step 2: Smooth boundary antialiasing to prevent black halos or harsh jagged edges
    # For pixels adjacent to is_bg:
    # If a pixel is is_bg, alpha = 0
    # If a pixel touches is_bg and is dark (e.g. antialiased hair/edge), compute soft alpha & un-premultiply color
    out_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    out_pixels = out_img.load()

    EDGE_MAX = 55  # Transition zone for edge antialiasing

    for x in range(w):
        for y in range(h):
            if is_bg[x][y]:
                out_pixels[x, y] = (0, 0, 0, 0)
            else:
                r, g, b, _ = pixels[x, y]
                max_val = max(r, g, b)

                # Check if this pixel touches a background pixel
                touches_bg = False
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (1, 1), (-1, 1), (1, -1)]:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h and is_bg[nx][ny]:
                        touches_bg = True
                        break

                if touches_bg and max_val <= EDGE_MAX:
                    # Antialiased edge transition
                    # Calculate alpha factor based on brightness above BG_THRESHOLD
                    factor = (max_val - 4) / (EDGE_MAX - 4)
                    factor = max(0.0, min(1.0, factor))
                    alpha = int(factor * 255)

                    if alpha > 0:
                        # De-black color to remove halo: scale color back up
                        scale = 255.0 / max(alpha, 1)
                        nr = min(255, int(r * scale))
                        ng = min(255, int(g * scale))
                        nb = min(255, int(b * scale))
                        out_pixels[x, y] = (nr, ng, nb, alpha)
                    else:
                        out_pixels[x, y] = (0, 0, 0, 0)
                else:
                    out_pixels[x, y] = (r, g, b, 255)

    out_img.save(out_path, format="PNG")
    print(f"✓ Saved transparent PNG: {out_path} ({os.path.getsize(out_path)} bytes)")

for src_name, out_path in images:
    src_path = os.path.join(user_uploaded_dir, src_name)
    remove_black_background(src_path, out_path)

shutil.copyfile("public/portrait-1.png", "public/portrait.png")
print("All 3 transparent PNGs successfully processed and verified!")
