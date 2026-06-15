# Omnia AI

## هيكل المشروع
```
omnia-project/
├── index.html      ← الواجهة الرئيسية
├── api/
│   └── chat.js    ← الـ proxy (يخفي الـ API key)
└── vercel.json     ← إعدادات Vercel
```

## خطوات الرفع

### 1. ارفع على GitHub
- أنشئ repo جديد على github.com
- ارفع كل الملفات

### 2. ربط Vercel
- اذهب إلى vercel.com وسجل بحساب GitHub
- اضغط "Add New Project" واختر الـ repo
- اضغط Deploy

### 3. أضف الـ API Key
- في Vercel → Settings → Environment Variables
- أضف:
  - Name: `GROQ_API_KEY`
  - Value: مفتاحك الحقيقي
- اضغط Save ثم أعد الـ Deploy

الـ key الآن محفوظ في Vercel فقط — لا أحد يشوفه ✅
