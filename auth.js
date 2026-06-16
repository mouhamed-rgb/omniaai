// auth.js
// وظائف المصادقة الأساسية: تسجيل حساب، تسجيل دخول، تسجيل خروج، ومراقبة حالة المستخدم
// كل دالة ترجع { success, ... } بدل رمي الأخطاء مباشرة، لتسهيل التعامل معها في الواجهة

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { auth } from "./firebase-config.js";

// ترجمة أكواد أخطاء Firebase إلى رسائل عربية مفهومة للمستخدم
function translateAuthError(code) {
  const messages = {
    "auth/email-already-in-use": "هذا البريد الإلكتروني مسجّل بالفعل، جرّب تسجيل الدخول.",
    "auth/invalid-email": "صيغة البريد الإلكتروني غير صحيحة.",
    "auth/weak-password": "كلمة المرور ضعيفة، يجب أن تكون 6 أحرف على الأقل.",
    "auth/missing-password": "يرجى إدخال كلمة المرور.",
    "auth/user-not-found": "لا يوجد حساب بهذا البريد الإلكتروني.",
    "auth/wrong-password": "كلمة المرور غير صحيحة.",
    "auth/invalid-credential": "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    "auth/too-many-requests": "تم حظر المحاولات مؤقتاً بسبب كثرتها، حاول لاحقاً.",
    "auth/network-request-failed": "تحقق من اتصالك بالإنترنت وحاول مجدداً."
  };
  return messages[code] || "حدث خطأ غير متوقع، حاول مرة أخرى.";
}

/**
 * تسجيل حساب جديد بالبريد الإلكتروني وكلمة المرور
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function signUp(email, password) {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: credential.user };
  } catch (error) {
    return { success: false, error: translateAuthError(error.code) };
  }
}

/**
 * تسجيل الدخول، مع توجيه تلقائي بعد النجاح (يمكن تعطيله بتمرير redirectUrl = null)
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function signIn(email, password, redirectUrl = "dashboard.html") {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    if (redirectUrl) window.location.href = redirectUrl;
    return { success: true, user: credential.user };
  } catch (error) {
    return { success: false, error: translateAuthError(error.code) };
  }
}

/**
 * تسجيل الخروج، مع توجيه اختياري بعد الإتمام
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function logOut(redirectUrl = "login.html") {
  try {
    await signOut(auth);
    if (redirectUrl) window.location.href = redirectUrl;
    return { success: true };
  } catch (error) {
    return { success: false, error: translateAuthError(error.code) };
  }
}

/**
 * مراقبة حالة تسجيل الدخول — استخدمها في أي صفحة تريد حمايتها
 * watchAuthState(user => { ... مسجل دخول ... }, () => { ... غير مسجل ... })
 * @returns {Function} دالة لإلغاء الاشتراك في المراقبة (unsubscribe)
 */
export function watchAuthState(onLoggedIn, onLoggedOut) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      onLoggedIn?.(user);
    } else {
      onLoggedOut?.();
    }
  });
}
