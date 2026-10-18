
import os

src = "/Users/kkyn/Documents/Work/PatternReg/final/frontend/src"
base = "/Users/kkyn/Documents/Work/PatternReg/final/frontend"

# 1. Fix tsconfig.json
with open(os.path.join(base, "tsconfig.json"), "w", encoding="utf-8") as f:
    f.write("""{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
""")

# 2. Fix inferenceEngine.ts (import getProtocolName)
with open(os.path.join(src, "lib/inferenceEngine.ts"), "r", encoding="utf-8") as f:
    content = f.read()

if "import { getProtocolName }" not in content:
    content = "import { getProtocolName } from \"./utils\";\n" + content
    with open(os.path.join(src, "lib/inferenceEngine.ts"), "w", encoding="utf-8") as f:
        f.write(content)

print("Fixed tsconfig and inferenceEngine import!")
