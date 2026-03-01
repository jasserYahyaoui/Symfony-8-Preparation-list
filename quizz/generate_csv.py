import os
import re

QUIZ_PARTS = [
    'di-part1.md',
]
BASE_DIR = '/home/jasser/workspace/Symfony-8-Preparation-list/quizz'
FINAL_MD = os.path.join(BASE_DIR, 'dependency-injection.md')
CSV_DIR = os.path.join(BASE_DIR, 'anki-exports')
CSV_FILE = os.path.join(CSV_DIR, 'dependency-injection.csv')

os.makedirs(CSV_DIR, exist_ok=True)

all_content = []
for part_file in QUIZ_PARTS:
    path = os.path.join(BASE_DIR, part_file)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            all_content.append(f.read())
        os.remove(path)

full_md = "\n\n".join(all_content)

header = """# Quiz : Dependency Injection (Symfony 8.0 Certification)
> Exam-grade mock test — 100+ questions based on official Symfony 8.0 syllabus.

---
"""
# clean
full_md = re.sub(r'# Quiz : Dependency Injection[^\n]+\n>[^\n]+\n\n---\n\n', '', full_md)
final_content = header + full_md

with open(FINAL_MD, 'w', encoding='utf-8') as f:
    f.write(final_content)

# CSV Extraction
questions = []
blocks = re.split(r'(?=### Q\d+:)', final_content)

for block in blocks:
    if not block.startswith('### Q'):
        continue
    
    question_match = re.search(r'### (Q\d+:.*?)(?=\*\*Correct Answer\(s\):\*\*|\Z)', block, re.DOTALL)
    if not question_match:
        continue
    
    front = question_match.group(1).strip()
    front_html = front.replace('\n', '<br>')
    
    back_match = re.search(r'(\*\*Correct Answer\(s\):\*\*.*?(?:\*\*Reference:\*\*.*?$|$))', block, re.DOTALL | re.MULTILINE)
    if back_match:
        back = back_match.group(1).strip()
        back_html = back.replace('\n', '<br>')
    else:
        back_html = "Error extracting back"
        
    questions.append(f'"{front_html}";"{back_html}"')

with open(CSV_FILE, 'w', encoding='utf-8') as f:
    f.write("\n".join(questions))

print(f"Combined into {FINAL_MD} and exported {len(questions)} Anki cards to {CSV_FILE}.")
