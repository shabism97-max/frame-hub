#!/usr/bin/env python3
import sys
import os
import re
import urllib.request
import urllib.parse
import json

def download_file(file_id, out_path):
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
            # Check if Google gave a virus scan warning confirmation token
            if b'download_warning' in content or b'confirm=' in content:
                match = re.search(r'confirm=([0-9A-Za-z_]+)', content.decode('utf-8', errors='ignore'))
                if match:
                    confirm_token = match.group(1)
                    confirm_url = f"{url}&confirm={confirm_token}"
                    req2 = urllib.request.Request(confirm_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req2) as resp2:
                        content = resp2.read()
            with open(out_path, 'wb') as f:
                f.write(content)
            print(f"Downloaded {out_path} ({len(content)} bytes)")
            return True
    except Exception as e:
        print(f"Failed to download {file_id}: {e}")
        return False

def fetch_folder_items(folder_id):
    url = f"https://drive.google.com/embeddedfolderview?id={folder_id}#grid"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            return html
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - Folder might be Restricted / Sign-in required.")
        return None

if __name__ == '__main__':
    folder_id = sys.argv[1] if len(sys.argv) > 1 else '1zorE6KAEpmNFfOpgfGjNBZlCdntXdlcI'
    print(f"Testing folder: {folder_id}")
    html = fetch_folder_items(folder_id)
    if html:
        print("Folder is accessible!")
    else:
        print("Folder requires public permission.")
