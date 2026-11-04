import os
import sys
from PIL import Image

# Ensure standard output can handle utf-8 on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

image_dir = os.path.join("src", "components", "image")
valid_extensions = (".jpg", ".jpeg", ".png")

total_before = 0
total_after = 0

print("Starting WebP conversion...")

for filename in os.listdir(image_dir):
    ext = os.path.splitext(filename)[1].lower()
    if ext in valid_extensions:
        filepath = os.path.join(image_dir, filename)
        size_before = os.path.getsize(filepath)
        total_before += size_before

        base_name = os.path.splitext(filename)[0]
        webp_path = os.path.join(image_dir, f"{base_name}.webp")

        try:
            with Image.open(filepath) as img:
                # Convert RGBA / P to RGB if saving without alpha or preserve alpha
                if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                    converted_img = img.convert("RGBA")
                else:
                    converted_img = img.convert("RGB")

                # Resize if excessively large (e.g. > 1600px) to keep web performance blazing fast
                max_dim = 1600
                if converted_img.width > max_dim or converted_img.height > max_dim:
                    converted_img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)

                # Save as WebP
                converted_img.save(webp_path, "WEBP", quality=80, method=6)

            size_after = os.path.getsize(webp_path)
            total_after += size_after

            print(f"[OK] {filename} ({size_before / 1024:.1f} KB) -> {base_name}.webp ({size_after / 1024:.1f} KB) [-{((size_before - size_after) / size_before) * 100:.1f}%]")
        except Exception as e:
            print(f"[FAIL] {filename}: {e}")

print("-" * 50)
print(f"Total Before: {total_before / (1024 * 1024):.2f} MB")
print(f"Total After:  {total_after / (1024 * 1024):.2f} MB")
print(f"Total Saved:  {(total_before - total_after) / (1024 * 1024):.2f} MB ({(total_before - total_after) / total_before * 100:.1f}%)")
