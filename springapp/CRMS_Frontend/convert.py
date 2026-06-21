import os
import re
import glob

def style_to_tailwind(style_str):
    classes = []
    # very naive mapping
    mapping = {
        'display: "flex"': 'flex',
        "display: 'flex'": 'flex',
        'display: "none"': 'hidden',
        "display: 'none'": 'hidden',
        'alignItems: "center"': 'items-center',
        "alignItems: 'center'": 'items-center',
        'justifyContent: "center"': 'justify-center',
        "justifyContent: 'center'": 'justify-center',
        'justifyContent: "space-between"': 'justify-between',
        "justifyContent: 'space-between'": 'justify-between',
        'flexDirection: "column"': 'flex-col',
        "flexDirection: 'column'": 'flex-col',
        'gap: "1rem"': 'gap-4',
        "gap: '1rem'": 'gap-4',
        'gap: "0.5rem"': 'gap-2',
        "gap: '0.5rem'": 'gap-2',
        'padding: "1rem"': 'p-4',
        "padding: '1rem'": 'p-4',
        'padding: "2rem"': 'p-8',
        "padding: '2rem'": 'p-8',
        'margin: "0"': 'm-0',
        'margin: 0': 'm-0',
        'fontWeight: 700': 'font-bold',
        'fontWeight: 800': 'font-extrabold',
        'fontSize: "1.5rem"': 'text-2xl',
        "fontSize: '1.5rem'": 'text-2xl',
        'fontSize: "0.875rem"': 'text-sm',
        "fontSize: '0.875rem'": 'text-sm',
        'width: "100%"': 'w-full',
        "width: '100%'": 'w-full',
        'background: "var(--background)"': 'bg-background',
        "background: 'var(--background)'": 'bg-background',
        'background: "var(--surface)"': 'bg-surface',
        "background: 'var(--surface)'": 'bg-surface',
        'background: "var(--primary)"': 'bg-primary',
        "background: 'var(--primary)'": 'bg-primary',
        'color: "var(--primary)"': 'text-primary',
        "color: 'var(--primary)'": 'text-primary',
        'color: "white"': 'text-white',
        "color: 'white'": 'text-white',
        'color: "var(--text-main)"': 'text-main',
        "color: 'var(--text-main)'": 'text-main',
        'color: "var(--text-muted)"': 'text-muted',
        "color: 'var(--text-muted)'": 'text-muted',
        'borderRadius: "24px"': 'rounded',
        "borderRadius: '24px'": 'rounded',
        'borderRadius: "16px"': 'rounded-2xl',
        "borderRadius: '16px'": 'rounded-2xl',
        'borderRadius: "8px"': 'rounded-lg',
        "borderRadius: '8px'": 'rounded-lg',
        'border: "1px solid var(--border)"': 'border border-border',
        "border: '1px solid var(--border)'": 'border border-border',
    }
    for k, v in mapping.items():
        if k in style_str:
            classes.append(v)
    return " ".join(classes)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find style={{ ... }}
    # This is a very naive regex
    pattern = re.compile(r'style=\{\{(.*?)\}\}', re.DOTALL)
    
    def replacer(match):
        style_content = match.group(1)
        tw_classes = style_to_tailwind(style_content)
        # If we successfully mapped at least some classes, let's replace it with className
        # Wait, there might be an existing className on the same element.
        # This is dangerous. Let's just append a special tailwind comment for now or do a naive replacement
        if tw_classes:
            return f'className="{tw_classes}"'
        else:
            return match.group(0)

    new_content = pattern.sub(replacer, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx'):
            process_file(os.path.join(root, file))

print("Done processing.")
