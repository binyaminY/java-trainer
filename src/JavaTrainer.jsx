import { useState } from "react";

// ══════════════════════════════════════════════════════════════════
//  QUESTION BANK  — 7 נושאים
// ══════════════════════════════════════════════════════════════════
const QUESTION_BANK = {

  files: {
    label:"Files in Java", icon:"📁", color:"#3b82f6",
    questions:[
      {q:"איזו מחלקה מייצגת קובץ/תיקייה ב-Java?",options:["FileReader","File","FileInputStream","BufferedReader"],answer:1,explain:"`File` מייצגת נתיב — קובץ או תיקייה. אינה קוראת/כותבת נתונים.",diff:"easy"},
      {q:"מה מחזירה `readLine()` בסוף הקובץ?",options:["EOF","מחרוזת ריקה","null","-1"],answer:2,explain:"`readLine()` מחזירה `null` בסוף הקובץ. לולאה: `while ((line = br.readLine()) != null)`.",diff:"easy"},
      {q:"מהו try-with-resources?",options:["try עם catch מרובים","try שסוגר אוטומטית משאבים AutoCloseable","try שתמיד מצליח","try עם finally מובנה"],answer:1,explain:"try-with-resources (Java 7+) סוגר אוטומטית משאבים המממשים `AutoCloseable`.",diff:"easy"},
      {q:"מה `new FileWriter(file, true)` עושה?",options:["מוחק ויוצר מחדש","פותח ב-append — מוסיף לסוף הקובץ","פותח לקריאה בלבד","יוצר קובץ חדש תמיד"],answer:1,explain:"`append=true` מוסיף לסוף קובץ קיים. ברירת המחדל (`false`) מוחקת את התוכן.",diff:"easy"},
      {q:"מה `file.exists()` מחזירה?",options:["יוצרת את הקובץ","true אם הנתיב קיים","מוחקת את הקובץ","בודקת אם הקובץ פתוח"],answer:1,explain:"`exists()` מחזירה `true` אם הנתיב קיים.",diff:"easy"},
      {q:"מה `file.mkdirs()` עושה?",options:["מוחק תיקיות","יוצר תיקייה אחת","יוצר תיקייה + כל תיקיות האב","רשימת תוכן"],answer:2,explain:"`mkdirs()` יוצר שרשרת תיקיות שלמה. `mkdir()` יוצר רק אחת.",diff:"easy"},
      {q:"מה ההבדל בין FileInputStream ל-FileReader?",options:["FileInputStream קורא bytes, FileReader קורא chars","אין הבדל","FileInputStream מהיר תמיד","FileReader לקבצים גדולים"],answer:0,explain:"`FileInputStream` — בינארי (bytes). `FileReader` — טקסט (chars).",diff:"easy"},
      {q:"מה ה-Serialization ב-Java?",options:["המרת String לאובייקט","המרת אובייקט לרצף bytes","הצפנת נתונים","יצירת thread"],answer:1,explain:"Serialization = המרת אובייקט ל-bytes. `Serializable` נדרש.",diff:"medium"},
      {q:"מה תפקיד serialVersionUID?",options:["מזהה לאובייקט","מספר גרסה לתאימות Serialization","מונה serialize","מזהה JVM"],answer:1,explain:"אם שונה — תיזרק `InvalidClassException` בעת deserialization.",diff:"medium"},
      {q:"מה `transient` עושה ב-Serialization?",options:["שדה חובה","משמיט את השדה מה-serialization","הופך לstatic","מונע שינוי"],answer:1,explain:"שדה `transient` לא ייכלל ב-serialization — לסיסמאות, חיבורי DB.",diff:"medium"},
      {q:"מהו NIO.2 ב-Java?",options:["ספריית רשת","ממשק מודרני לקבצים — Path, Files (Java 7+)","ספריית XML","טיפול ב-null"],answer:1,explain:"NIO.2 (java.nio.file) — API מודרני לעבודה עם מערכת הקבצים.",diff:"medium"},
      {q:"מה ההבדל בין Path ל-File?",options:["אין הבדל","Path שייך ל-NIO.2, מודרני, תומך symlinks","File חדש יותר","Path רק ל-Linux"],answer:1,explain:"`Path` עדיף — תמיכה ב-symbolic links, FileSystem מופשט.",diff:"medium"},
      {q:"מה `Files.readAllLines(path)` עושה?",options:["כותב שורות","מחזיר List<String> עם כל שורות הקובץ","מוחק","קורא byte"],answer:1,explain:"`Files.readAllLines(path)` — List<String> עם כל השורות.",diff:"medium"},
      {q:"מה `flush()` עושה בכתיבה?",options:["מוחק","מאלץ כתיבת buffer לדיסק","סוגר","קורא מחדש"],answer:1,explain:"`flush()` מבטיח כתיבת ה-buffer לדיסק. חשוב לפני סגירה.",diff:"medium"},
      {q:"מה `Files.walk(path)` עושה?",options:["מעביר קובץ","מחזיר Stream<Path> רקורסיבי של כל הנתיבים","בודק הרשאות","פותח בעורך"],answer:1,explain:"`Files.walk()` — lazy Stream רקורסיבי לכל הנתיבים.",diff:"medium"},
      {q:"מה `RandomAccessFile`?",options:["קובץ בסדר אקראי","קובץ שניתן לקרוא/לכתוב בכל מיקום (seek)","גישה מרובת threads","קובץ זמני"],answer:1,explain:"`RandomAccessFile` מאפשר `seek(position)` לניווט חופשי.",diff:"medium"},
      {q:"מה `Files.lines(path)` לעומת `readAllLines()`?",options:["זהים","lines() — lazy Stream; readAllLines() — טוען הכל לזיכרון","readAllLines() מהיר יותר","lines() לוקח יותר זיכרון"],answer:1,explain:"`Files.lines()` — lazy, חסכוני לקבצים גדולים. `readAllLines()` — מלא לזיכרון.",diff:"medium"},
      {q:"מה `Files.copy(src, dest, REPLACE_EXISTING)` עושה?",options:["מעביר","מעתיק ומחליף יעד קיים","יוצר symlink","משווה"],answer:1,explain:"ללא `REPLACE_EXISTING` — תיזרק `FileAlreadyExistsException`.",diff:"medium"},
      {q:"מה `Files.delete()` לעומת `deleteIfExists()`?",options:["זהים","delete() זורקת exception אם לא קיים; deleteIfExists() בטוחה יותר","deleteIfExists() מהירה","delete() לא קיים"],answer:1,explain:"`Files.deleteIfExists()` בטוחה יותר — לא זורקת exception.",diff:"medium"},
      {q:"מה Suppressed Exception בtry-with-resources?",options:["exception שנאבדת","exception מסגירת המשאב שמצורפת לעיקרית","מ-finally בלבד","מודפסת בשקט"],answer:1,explain:"אם גם הגוף וגם `close()` זורקים, ה-close exception מצורפת כ-suppressed.",diff:"hard"},
      {q:"מה `FileChannel` ב-NIO?",options:["קריאה מהירה עם memory-mapping ו-locking","ממשק גרפי","דחיסה","קריאת CSV"],answer:0,explain:"`FileChannel` — קריאה/כתיבה מהירה, memory-mapped files, file locking.",diff:"hard"},
      {q:"מה `WatchService` ב-NIO.2?",options:["מד-זמן","שירות לניטור שינויים בתיקייה","בדיקת תקינות","backup"],answer:1,explain:"`WatchService` — רישום לאירועי מערכת הקבצים (יצירה, מחיקה, שינוי).",diff:"hard"},
      {q:"מה `ObjectInputStream.readObject()` עושה?",options:["קורא שורת טקסט","ממיר bytes לאובייקט (deserialization)","קורא int","קורא הכל"],answer:1,explain:"`readObject()` מבצע deserialization. יש לבצע cast ולתפוס `ClassNotFoundException`.",diff:"hard"},
      {q:"מה קורה כש-serialVersionUID שונה בdeserialization?",options:["מחזיר null","נזרקת InvalidClassException","אובייקט חלקי","שגיאת קומפילציה"],answer:1,explain:"`InvalidClassException` — ה-serialVersionUID שמור שונה מזה שבמחלקה.",diff:"hard"},
      {q:"מה `Files.createTempFile(prefix, suffix)` עושה?",options:["יוצר תיקיית temp","יוצר קובץ זמני ייחודי","מחזיר תיקיית temp","מוחק temp"],answer:1,explain:"`createTempFile()` — קובץ זמני ייחודי. כדאי `deleteOnExit()`.",diff:"hard"},
    ]
  },

  exceptions: {
    label:"Exceptions in Java", icon:"⚡", color:"#8b5cf6",
    questions:[
      {q:"מה ההבדל בין Checked לUnchecked Exception?",options:["Checked בריצה, Unchecked בקומפילציה","Checked חייבת תפיסה/הכרזה, Unchecked לא","אין הבדל","Unchecked חמורה"],answer:1,explain:"Checked (IOException) — הקומפיילר מאלץ טיפול. Unchecked (RuntimeException) — אופציונלי.",diff:"easy"},
      {q:"מה Throwable hierarchy?",options:["Exception->Throwable->Error","Throwable->Exception->RuntimeException","RuntimeException->Exception->Throwable","Error->Exception->Throwable"],answer:1,explain:"Throwable השורש. Exception ו-Error יורשים ממנו. RuntimeException יורש מ-Exception.",diff:"easy"},
      {q:"מה ההבדל בין `throw` ל-`throws`?",options:["אין הבדל","throw זורק בפועל, throws מכריז בחתימה","throws זורק, throw מכריז","throws רק לChecked"],answer:1,explain:"`throw new IOException()` — זריקה. `void m() throws IOException` — הכרזה.",diff:"easy"},
      {q:"מה עושה בלוק `finally`?",options:["רץ רק בלי exception","רץ רק עם exception","רץ תמיד","מחליף catch"],answer:2,explain:"`finally` רץ תמיד — עם ובלי exception. נוצר לסגירת משאבים.",diff:"easy"},
      {q:"מה `NullPointerException`?",options:["גישה לאינדקס לא קיים","גישה לשדה/מתודה של null reference","חלוקה באפס","שגיאת מחרוזות"],answer:1,explain:"NPE (Unchecked) — גישה למשתנה null. Java 14+ מספקת הודעה מפורטת.",diff:"easy"},
      {q:"מה `ClassCastException`?",options:["יצירת abstract instance","cast לסוג לא תואם","שגיאה בטעינת מחלקה","שימוש ב-final"],answer:1,explain:"`ClassCastException` — `(String) obj` כשobj אינו String.",diff:"easy"},
      {q:"מה `ArrayIndexOutOfBoundsException`?",options:["מערך ריק","גישה לאינדקס מחוץ לטווח","מערך גדול מדי","הכרזה שגויה"],answer:1,explain:"גישה ל-`arr[arr.length]` או אינדקס שלילי.",diff:"easy"},
      {q:"מה `NumberFormatException`?",options:["מספר גדול מדי","פרסור מחרוזת לא מספרית — Integer.parseInt(\"abc\")","חלוקה באפס","overflow"],answer:1,explain:"`NumberFormatException` יורשת מ-`IllegalArgumentException`.",diff:"easy"},
      {q:"מה `ArithmeticException`?",options:["שגיאה מתמטית כללית","חלוקה באפס ב-int","overflow","שגיאה ב-float"],answer:1,explain:"`ArithmeticException` — חלוקת int/long באפס. חלוקת float באפס -> Infinity.",diff:"easy"},
      {q:"כיצד יוצרים Custom Exception?",options:["מממשים ממשק Exception","יורשים מ-Exception (Checked) או RuntimeException (Unchecked)","רק annotation","ExceptionFactory"],answer:1,explain:"ירושה מ-`Exception` -> Checked. ירושה מ-`RuntimeException` -> Unchecked.",diff:"easy"},
      {q:"מה `multi-catch` ב-Java 7+?",options:["מספר try","catch (A | B e) — תפיסת מספר סוגים בבלוק אחד","catch עם inheritance","catch בlambda"],answer:1,explain:"`catch (IOException | SQLException e)` — קוד קצר יותר.",diff:"medium"},
      {q:"מה `StackOverflowError`?",options:["Checked exception","Error מ-call stack מלא — רקורסיה אינסופית","Exception בStack","שגיאת heap"],answer:1,explain:"`StackOverflowError` הוא `Error` — רקורסיה ללא תנאי עצירה.",diff:"medium"},
      {q:"מה Exception Chaining?",options:["שרשור catch","זריקת exception חדשה תוך שמירת הסיבה המקורית","כמה exceptions במקביל","Exception בforEach"],answer:1,explain:"`throw new ServiceException(\"msg\", original)` — שומר cause לdebug.",diff:"medium"},
      {q:"מה `UnsupportedOperationException`?",options:["פעולה לא מומלצת","פעולה שאינה נתמכת — add() על רשימה immutable","שגיאה באופרטור","חריגה בחישוב"],answer:1,explain:"`Arrays.asList().add()` תזרוק `UnsupportedOperationException`.",diff:"medium"},
      {q:"מה `ConcurrentModificationException`?",options:["שגיאה בmultithreading תמיד","שינוי Collection בזמן איטרציה עליה","גישה לnull","Collection גדולה"],answer:1,explain:"שינוי Collection בזמן for-each — `ConcurrentModificationException`. פתרון: `Iterator.remove()`.",diff:"medium"},
      {q:"מה `IllegalStateException`?",options:["חוק לא חוקי","מצב האובייקט לא מתאים לפעולה","שדה static שגוי","interface לא מיושם"],answer:1,explain:"למשל: `Iterator.next()` לפני `hasNext()`, פעולה על חיבור סגור.",diff:"medium"},
      {q:"מה `e.getCause()`?",options:["סוג ה-exception","ה-exception המקורית שגרמה לנוכחית","הודעת השגיאה","מחלקת exception"],answer:1,explain:"`getCause()` מחזיר את ה-exception המקורית — חלק מ-Exception Chaining.",diff:"medium"},
      {q:"מה `Exception Propagation`?",options:["שכפול לthreads","exception שלא נתפסת עולה בcall stack עד שנתפסת/מסיימת","העברה לcatch אחרת","שמירה לlog"],answer:1,explain:"אם מתודה לא תופסת — ה-exception עולה למתודה הקוראת.",diff:"medium"},
      {q:"מה Suppressed Exceptions בtry-with-resources?",options:["נאבדות","מסגירת משאב — מצורפות לעיקרית","מ-finally","מודפסות"],answer:1,explain:"אם הגוף ו-`close()` זורקים — ה-close exception מצורפת כ-suppressed.",diff:"hard"},
      {q:"מה `InvocationTargetException`?",options:["exception בReflection כשהמתודה שנקראה זרקה","exception בטעינת classes","שגיאה בthread","ClassLoader"],answer:0,explain:"`InvocationTargetException` עוטפת exception מ-Reflection. יש לחלץ עם `getCause()`.",diff:"hard"},
      {q:"מה `try-finally` ללא `catch`?",options:["שגיאת קומפילציה","חוקי — לסגירת משאבים גם כש-exception לא נתפסת","Java 9+ בלבד","חוקי רק עם throws"],answer:1,explain:"`try-finally` ללא catch — חוקי. המשאב ייסגר גם אם exception תעלה.",diff:"hard"},
      {q:"מה `AssertionError`?",options:["שגיאה בunit tests","נזרק כש-assert נכשל (עם -ea)","שגיאה בהשמה","JUnit תמיד"],answer:1,explain:"`assert condition;` זורק `AssertionError` — רק עם `-ea`.",diff:"hard"},
      {q:"מה `OutOfMemoryError`?",options:["Checked Exception","Error כשJVM לא יכול להקצות זיכרון","Exception בGC","שגיאת Serialization"],answer:1,explain:"`OutOfMemoryError` — Error. Heap מלא, לרוב memory leak.",diff:"hard"},
      {q:"מה ייתרון Exception Chaining לעומת זריקה בלי cause?",options:["אין","שמירת stack trace המקורי לdebug","מהיר יותר","חובה בJava 8+"],answer:1,explain:"ללא cause — ה-stack trace המקורי אובד. קשה לדעת מה גרם לבעיה.",diff:"hard"},
      {q:"האם `catch` ריק חוקי?",options:["לא, שגיאת קומפילציה","כן, חוקי אבל באד פרקטיס חמור","רק RuntimeException","Java 17+"],answer:1,explain:"catch ריק 'בולע' exceptions — הבעיה נעלמת בשקט. קוד מסוכן.",diff:"medium"},
    ]
  },

  oop: {
    label:"OOP — מונחה עצמים", icon:"🏗️", color:"#10b981",
    questions:[
      {q:"מה 4 עקרונות OOP?",options:["Encapsulation, Inheritance, Polymorphism, Abstraction","Encapsulation, Recursion, Polymorphism, Abstraction","Inheritance, Iteration, Polymorphism, Abstraction","Encapsulation, Inheritance, Pointer, Abstraction"],answer:0,explain:"OOP: Encapsulation, Inheritance, Polymorphism, Abstraction.",diff:"easy"},
      {q:"מה Encapsulation?",options:["הסתרת מימוש וחשיפת ממשק דרך getters/setters","יצירת אובייקטים","ירושת מאפיינים","שימוש בinterface"],answer:0,explain:"Encapsulation = כמוס — שדות private, גישה דרך public methods.",diff:"easy"},
      {q:"מה Polymorphism?",options:["מחלקה שיורשת","יכולת לטפל באובייקטים שונים דרך ממשק אחיד","הסתרת שדות","יצירת אובייקטים"],answer:1,explain:"Polymorphism = רב-צורתיות. Animal ref מחזיק Dog/Cat, כל אחד מגיב בדרכו.",diff:"easy"},
      {q:"מה ההבדל בין abstract class לinterface?",options:["אין הבדל","abstract class: ירושה בודדת + מימוש; interface: ריבוי מימוש + default methods (Java 8+)","interface מהיר","abstract לא ניתנת לירושה"],answer:1,explain:"abstract class = ירושה בודדת + מימוש. interface = ריבוי מימוש.",diff:"easy"},
      {q:"מה `@Override` עושה?",options:["יוצר מתודה","מסמן דריסת מתודה של האב + קומפיילר מאמת","מסמן כסטטית","מונע ירושה"],answer:1,explain:"`@Override` — הקומפיילר מאמת שיש מתודה תואמת ב-superclass.",diff:"easy"},
      {q:"מה `super` ב-Java?",options:["מצביע לאובייקט הנוכחי","מצביע למחלקת האב — constructor, שדות, מתודות","מצביע לממשק","מצביע לstatic"],answer:1,explain:"`super()` — constructor האב. `super.method()` — מתודת האב שנדרסה.",diff:"easy"},
      {q:"מה `final` על מחלקה?",options:["לא ניתנת לאתחול","לא ניתנת לירושה","כל שדותיה final","מתודות סטטיות בלבד"],answer:1,explain:"`final class` לא ניתנת לירושה — כמו `String`, `Integer`.",diff:"easy"},
      {q:"מה `static` על שדה?",options:["שייך לאובייקט","שייך למחלקה — משותף לכל האובייקטים","לא ניתן לשינוי","מוסתר"],answer:1,explain:"`static` שדה שייך למחלקה, לא לאובייקט. כולם חולקים אותו.",diff:"easy"},
      {q:"מה instanceof?",options:["שיוויון ערכים","בודק אם אובייקט הוא instance של מחלקה/ממשק","השוואת references","בודק null"],answer:1,explain:"`if (obj instanceof Dog)` — בדיקת סוג בזמן ריצה. Java 16+: pattern matching.",diff:"easy"},
      {q:"מה default constructor?",options:["constructor שנדרס","constructor ללא פרמטרים שהקומפיילר מוסיף בהיעדר אחר","ערכי ברירת מחדל","constructor סטטי"],answer:1,explain:"אם לא הגדרת constructor — הקומפיילר מוסיף `ClassName() {}`. ברגע שהגדרת — נעלם.",diff:"easy"},
      {q:"מה ירושה מרובה ב-Java?",options:["Java תומכת בירושה מרובה מclasses","Java לא תומכת מclasses (diamond problem), כן מinterfaces","חוקית בכל מצב","רק מממשקים תמיד"],answer:1,explain:"`class C extends A, B` — אסור. `class C implements IA, IB` — מותר.",diff:"medium"},
      {q:"מה abstract method?",options:["מימוש ריק","מתודה ללא גוף שחייבת מימוש בsubclass","מתודה final","מתודה private"],answer:1,explain:"abstract method — מוכרזת ב-abstract class ללא גוף `{}`.",diff:"medium"},
      {q:"מה default method בinterface (Java 8+)?",options:["רק subclasses ממשים","מתודה עם מימוש בinterface שניתן לדרוס","מתודה סטטית","מתודה ריקה"],answer:1,explain:"ב-Java 8+ ניתן להוסיף `default` methods לinterface.",diff:"medium"},
      {q:"מה ההבדל בין == לequals() באובייקטים?",options:["אין הבדל","== משווה references; equals() משווה תוכן (אם נדרס)","equals() תמיד כמו ==","== לא עובד"],answer:1,explain:"`==` בודק אם אותו אובייקט. `equals()` בודק שוויון לוגי.",diff:"medium"},
      {q:"מה hashCode() והקשר לequals()?",options:["אין קשר","equals()==true -> hashCode() חייב להיות זהה","hashCode() מחליף","רק לString"],answer:1,explain:"Contract: equals(true) -> hashCode() זהה. חשוב ל-HashMap/HashSet.",diff:"medium"},
      {q:"מה Composition לעומת Inheritance?",options:["אין הבדל","Composition — has-a; Inheritance — is-a","Composition מהיר","Inheritance גמיש יותר"],answer:1,explain:"Car has-a Engine (Composition). Dog is-a Animal (Inheritance).",diff:"medium"},
      {q:"מה Overloading לעומת Overriding?",options:["אין הבדל","Overloading — שם זהה, פרמטרים שונים; Overriding — דריסת מתודה בsubclass","Overriding בקומפילציה","Overloading רק בinterfaces"],answer:1,explain:"Overloading = compile-time. Overriding = runtime polymorphism.",diff:"medium"},
      {q:"מה SOLID principles?",options:["Single, Open, Liskov, Interface, Dependency","Simple, Open, Liskov, Interface, Dependency","Single, Open, Liskov, Isolation, Dependency","Single, Object, Liskov, Interface, Dependency"],answer:0,explain:"SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",diff:"hard"},
      {q:"מה Liskov Substitution Principle?",options:["subclass תמיד זהה","אם S subtype של T — ניתן להחליף T ב-S בלי לשבור","subclass יכול להסיר מתודות","תמיד interface"],answer:1,explain:"LSP: subclass חייבת לכבד את החוזה של superclass.",diff:"hard"},
      {q:"מה Dynamic Dispatch ב-Java?",options:["dispatch של threads","קביעת איזו מתודה לקרוא בזמן ריצה לפי סוג האובייקט האמיתי","dispatch של events","פונקציונלי"],answer:1,explain:"קריאת מתודה וירטואלית נקבעת בזמן ריצה לפי סוג האובייקט, לא המשתנה.",diff:"hard"},
      {q:"מה Marker Interface?",options:["interface עם מתודה אחת","interface ריק שמסמן תכונה — Serializable, Cloneable","interface עם annotation","interface Java 8+"],answer:1,explain:"Marker Interface ריק לחלוטין — מסמן שמחלקה תומכת ביכולת.",diff:"hard"},
      {q:"מה Singleton design pattern?",options:["instances ללא הגבלה","מבטיח instance יחיד עם גישה גלובלית","ללא constructor","סטטית בלבד"],answer:1,explain:"Singleton: constructor private + static `getInstance()`.",diff:"medium"},
      {q:"מה Immutable class?",options:["לא ניתן לרשת","אובייקטה לא ניתן לשינוי לאחר יצירה (כמו String)","שדות public","abstract"],answer:1,explain:"Immutable: שדות `final`, אין setters, constructor מאתחל הכל.",diff:"medium"},
      {q:"מה Anonymous Class?",options:["class ללא שדות","class ללא שם, מוגדרת ומאותחלת בו-זמנית","class private","class סטטית"],answer:1,explain:"Anonymous class: `new Runnable() { public void run() {...} }` — לפני Lambdas.",diff:"hard"},
      {q:"מה Covariant Return Type?",options:["אין דבר כזה","subclass יכולה לדרוס מתודה ולהחזיר תת-מחלקה של return type","return type זהה תמיד","רק בinterface"],answer:1,explain:"Java 5+: override עם return type יותר ספציפי. `Animal get()` -> `Dog get()`.",diff:"hard"},
    ]
  },

  collections: {
    label:"Collections Framework", icon:"🗂️", color:"#f59e0b",
    questions:[
      {q:"מה ההבדל בין ArrayList לLinkedList?",options:["אין הבדל","ArrayList — גישה מהירה O(1); LinkedList — הכנסה/מחיקה מהירה בקצוות","LinkedList מהיר תמיד","ArrayList תומך null בלבד"],answer:1,explain:"ArrayList: גישה O(1), הכנסה באמצע O(n). LinkedList: קצה O(1), גישה O(n).",diff:"easy"},
      {q:"מה ההבדל בין HashSet לTreeSet?",options:["אין הבדל","HashSet — אין סדר O(1); TreeSet — ממוין O(log n)","TreeSet מהיר","HashSet ממוין"],answer:1,explain:"HashSet — hash table, אין סדר. TreeSet — Red-Black tree, ממוין.",diff:"easy"},
      {q:"מה ההבדל בין HashMap לTreeMap?",options:["אין הבדל","HashMap — אין סדר O(1); TreeMap — ממוין לפי מפתח O(log n)","TreeMap מהיר","HashMap — null key בלבד"],answer:1,explain:"HashMap: hash table, ללא סדר. TreeMap: Red-Black tree, ממוין.",diff:"easy"},
      {q:"מה Iterator?",options:["לולאת for","ממשק לאיטרציה עם hasNext(), next(), remove()","Collection מיוחדת","מחלקה אבסטרקטית"],answer:1,explain:"`Iterator` — מעבר בטוח על Collection תוך מחיקה עם `remove()`.",diff:"easy"},
      {q:"מה LinkedHashMap?",options:["ממוין לפי מפתח","HashMap שמשמר סדר הכנסה","ממוין לפי ערך","מסונכרן"],answer:1,explain:"`LinkedHashMap` = HashMap + LinkedList. שומר סדר הכנסה.",diff:"easy"},
      {q:"מה Queue interface?",options:["מחסנית LIFO","תור FIFO — offer(), poll(), peek()","מיפוי key-value","Set ייחודי"],answer:1,explain:"`Queue` — FIFO: `offer()` מוסיף, `poll()` מסיר מהראש.",diff:"easy"},
      {q:"מה PriorityQueue?",options:["Queue עם FIFO","Queue שמחזיר האיבר עם עדיפות הנמוכה ביותר (min-heap)","Queue ממוין","Queue בגודל קבוע"],answer:1,explain:"`PriorityQueue` — min-heap. `poll()` = האיבר הקטן ביותר.",diff:"medium"},
      {q:"מה Comparable לעומת Comparator?",options:["אין הבדל","Comparable — סדר טבעי פנימי; Comparator — סדר חיצוני גמיש","Comparator קשה","Comparable רק לString"],answer:1,explain:"`Comparable.compareTo()` בתוך המחלקה. `Comparator` — מחוץ, גמיש.",diff:"medium"},
      {q:"מה `List.of()` (Java 9+)?",options:["יוצר ArrayList","יוצר List immutable","יוצר LinkedList","יוצר List מסונכרן"],answer:1,explain:"`List.of()` — immutable. גם `set()` וגם `add()` יזרקו exception.",diff:"medium"},
      {q:"מה `HashMap.getOrDefault(key, val)`?",options:["מוסיף key","מחזיר ערך הkey אם קיים, אחרת val","null תמיד","שגיאה"],answer:1,explain:"`getOrDefault()` — גישה בטוחה לMap ללא בדיקת null.",diff:"medium"},
      {q:"מה Load Factor ב-HashMap?",options:["גודל המפה","יחס entries לbuckets — 0.75 ברירת מחדל, מעבר -> resize","מספר collisions","גודל מפתח"],answer:1,explain:"Load factor 0.75 = 75% מלא -> resize. גבוה: פחות זיכרון, יותר collisions.",diff:"hard"},
      {q:"מה ConcurrentHashMap לעומת synchronized HashMap?",options:["אין הבדל","ConcurrentHashMap נועלת segment בלבד — ביצועי concurrency טובים","ConcurrentHashMap איטית","synchronized יותר thread-safe"],answer:1,explain:"`ConcurrentHashMap` — נועלת bucket ספציפי, מאפשרת reads מקבילים.",diff:"hard"},
      {q:"מה CopyOnWriteArrayList?",options:["ArrayList רגיל","ArrayList thread-safe שיוצר עותק בכל שינוי","ArrayList מסונכרן","ArrayList immutable"],answer:1,explain:"`CopyOnWriteArrayList` — thread-safe, מתאים לקריאה מרובה ועדכון נדיר.",diff:"hard"},
      {q:"מה `Map.computeIfAbsent(key, fn)`?",options:["מחשב ומחליף תמיד","אם key לא קיים — מחשב ומכניס; מחזיר את הערך","מוחק key","שגיאה"],answer:1,explain:"`computeIfAbsent()` — נפוץ לאתחול: `map.computeIfAbsent(k, k -> new ArrayList<>()).add(v)`.",diff:"hard"},
      {q:"מה ArrayDeque לעומת LinkedList?",options:["ArrayDeque איטי","ArrayDeque — array מעגלי, מהיר יותר בפועל לStack/Queue","ArrayDeque תומך null","LinkedList תמיד עדיף"],answer:1,explain:"`ArrayDeque` — אין pointer overhead, cache-friendly. מועדף לStack/Queue.",diff:"hard"},
      {q:"מה Map.Entry?",options:["כניסה לMap","ממשק המייצג זוג key-value — גישה דרך entrySet()","מחלקה מופשטת","ממשק לאיטרציה"],answer:1,explain:"`entrySet()` מחזיר `Set<Map.Entry<K,V>>` — איטרציה על key וvalue יחד.",diff:"medium"},
      {q:"מה `remove(int index)` לעומת `remove(Object o)` בArrayList?",options:["אין הבדל","ראשון לפי אינדקס, שני לפי ערך — בעייתי עם Integer","remove(int) מהיר","remove(Object) לפי אינדקס"],answer:1,explain:"`list.remove(1)` — אינדקס. `list.remove(Integer.valueOf(1))` — ערך.",diff:"hard"},
      {q:"מה WeakHashMap?",options:["HashMap עם null keys","HashMap עם WeakReferences — GC יכול למחוק entries","HashMap מוצפן","HashMap מסונכרן"],answer:1,explain:"`WeakHashMap` — מתאים לcache: כשGC מוחק מפתח, entry נמחק.",diff:"hard"},
      {q:"מה NavigableMap?",options:["Map רגיל","הרחבה של SortedMap עם floorKey(), ceilingKey(), headMap(), tailMap()","Map immutable","Map מסונכרן"],answer:1,explain:"`TreeMap` מממש `NavigableMap` — שאילתות טווח.",diff:"hard"},
      {q:"מה Stack ב-Java?",options:["interface","מחלקה עתיקה LIFO (עדיף ArrayDeque)","Queue הפוך","תת-מחלקה של LinkedList"],answer:1,explain:"`Stack` ישנה ומסונכרנת. עדיף `ArrayDeque`: `push()`, `pop()`, `peek()`.",diff:"medium"},
      {q:"מה Collections.sort() עושה?",options:["ממיין לפי hash","ממיין List לפי Comparable/Comparator","ממיין Set","ממיין Map"],answer:1,explain:"`Collections.sort(list)` — Comparable. `sort(list, comparator)` — מותאם.",diff:"easy"},
      {q:"מה EnumSet ו-EnumMap?",options:["Collections רגילים","Collections מייעלות לenum בזכות bit manipulation","לא תומכות enum","Java 11+"],answer:1,explain:"`EnumSet` — bit vector. `EnumMap` — מערך פנימי. מהירים מאוד לenums.",diff:"hard"},
      {q:"מה List.subList(from, to)?",options:["עותק של הרשימה","view של חלק — שינויים מתבטאים במקורית","מוחק איברים","ממיין חלק"],answer:1,explain:"`subList()` מחזיר view, לא עותק. שינויים ב-subList משפיעים על המקורית.",diff:"hard"},
      {q:"מה Collections.frequency(collection, obj)?",options:["מחזיר מספר Collections","מחזיר כמה פעמים obj מופיע","מוצא הנפוץ","בודק שיוויון"],answer:1,explain:"`Collections.frequency()` — סופר הופעות של איבר ב-Collection.",diff:"medium"},
      {q:"מה Collections.unmodifiableList()?",options:["מוחק","view שזורק UnsupportedOperationException על שינויים","מעתיק","ממיין"],answer:1,explain:"read-only view. כל `add/remove/set` יזרוק exception.",diff:"medium"},
    ]
  },

  streams: {
    label:"Streams & Lambdas (Java 8+)", icon:"🌊", color:"#06b6d4",
    questions:[
      {q:"מה Lambda Expression?",options:["מחלקה אנונימית","פונקציה אנונימית: (params) -> body","לולאה מיוחדת","אופרטור"],answer:1,explain:"Lambda = פונקציה אנונימית. `(x) -> x * 2` במקום anonymous class.",diff:"easy"},
      {q:"מה Functional Interface?",options:["interface עם כל מתודות ממומשות","interface עם בדיוק מתודה abstract אחת (Runnable, Comparator)","interface עם default methods","interface סטטי"],answer:1,explain:"Functional Interface = מתודה abstract אחת. @FunctionalInterface annotation.",diff:"easy"},
      {q:"מה Stream ב-Java 8?",options:["InputStream/OutputStream","רצף איברים לפעולות pipeline declarative","Thread מיוחד","Collection חדשה"],answer:1,explain:"Stream = pipeline על נתונים. Intermediate (filter, map) + Terminal (collect, forEach).",diff:"easy"},
      {q:"מה ההבדל בין Intermediate לTerminal?",options:["אין הבדל","Intermediate — lazy, מחזירות Stream; Terminal — מריצות הכל","Intermediate מהירות","Terminal מחזירות Stream"],answer:1,explain:"Intermediate (filter, map) — lazy. Terminal (collect, forEach, count) — מריץ הכל.",diff:"easy"},
      {q:"מה `filter()` עושה?",options:["ממיין","מסנן לפי predicate","ממיר כל איבר","מגביל כמות"],answer:1,explain:"`stream.filter(x -> x > 0)` — רק האיברים החיוביים.",diff:"easy"},
      {q:"מה `map()` עושה?",options:["מוסיף אלמנטים","ממיר כל איבר: stream.map(x -> x * 2)","מסנן","אוסף לCollection"],answer:1,explain:"`map()` ממיר: `Stream<String>` -> `Stream<Integer>` עם `map(String::length)`.",diff:"easy"},
      {q:"מה `collect()` עושה?",options:["סופר","Terminal שאוסף Stream לCollection/ערך","מסנן","ממיר"],answer:1,explain:"`collect(Collectors.toList())`, `collect(Collectors.joining(\",\"))`.",diff:"easy"},
      {q:"מה `distinct()` עושה?",options:["ממיין","מסיר כפילויות (לפי equals())","מסנן null","מגביל גודל"],answer:1,explain:"`distinct()` מסיר כפילויות.",diff:"easy"},
      {q:"מה Method Reference?",options:["reference לshared method","קיצור ללambda: String::length במקום s -> s.length()","annotation","כינוי לinterface"],answer:1,explain:"4 סוגים: `Class::static`, `instance::method`, `Class::instance`, `Class::new`.",diff:"medium"},
      {q:"מה `reduce()` עושה?",options:["מצמצם גודל","מצמצם Stream לערך יחיד: reduce(0, Integer::sum)","מסיר כפילויות","ממיין"],answer:1,explain:"`reduce(identity, accumulator)` — סכום, מכפלה וכו'.",diff:"medium"},
      {q:"מה `flatMap()` עושה?",options:["כמו map()","ממיר כל איבר לStream ומאחד: Stream<List<T>> -> Stream<T>","מסנן null","ממיר לOptional"],answer:1,explain:"`flatMap()` = map + flatten. מרשימת רשימות לרשימה שטוחה.",diff:"medium"},
      {q:"מה Optional?",options:["מחזיק null","מחזיק ערך שעלול להיות null — isPresent(), get(), orElse()","Collection של ערך","promise"],answer:1,explain:"`Optional` מאלץ טיפול מפורש ב-null. API בטוח.",diff:"medium"},
      {q:"מה `Collectors.groupingBy()`?",options:["ממיין","אוסף ל-Map לפי classifier: groupingBy(Person::getCity)","מסנן קבוצות","סופר"],answer:1,explain:"`groupingBy()` — `Map<K, List<T>>`. נפוץ לסיכום נתונים.",diff:"medium"},
      {q:"מה Predicate, Function, Consumer, Supplier?",options:["interfaces לlegacy","Functional Interfaces: Predicate<T>, Function<T,R>, Consumer<T>, Supplier<T>","מחלקות מופשטות","annotations"],answer:1,explain:"4 ה-functional interfaces הנפוצים ב-Java 8.",diff:"medium"},
      {q:"מה parallel Stream?",options:["Stream עם עדיפות","Stream שמבצע פעולות על כמה threads — מתאים לנתונים גדולים","Stream מסונכרן","Stream עם timeout"],answer:1,explain:"`collection.parallelStream()` — threads. לא תמיד מהיר — overhead גדול לנתונים קטנים.",diff:"medium"},
      {q:"מה `peek()` עושה?",options:["מחזיר ראשון","Intermediate לdebug — רואה כל איבר בלי לשנות","Terminal","מסנן"],answer:1,explain:"`peek(System.out::println)` — שימושי לdebug pipeline.",diff:"medium"},
      {q:"מה `Collectors.partitioningBy()`?",options:["מחלק לN קבוצות","מחלק ל-Map<Boolean, List<T>> לפי predicate","ממיין לפי predicate","מסנן"],answer:1,explain:"`partitioningBy(x -> x > 0)` -> `{true:[1,2], false:[-1,-2]}`.",diff:"hard"},
      {q:"מה `findFirst()` לעומת `findAny()`?",options:["אין הבדל","findFirst — תמיד ראשון; findAny — כלשהו, יעיל בparallel","findAny מהיר תמיד","findFirst לא קיים"],answer:1,explain:"`findFirst()` — deterministic. `findAny()` — מהיר בparallel. שניהם -> `Optional`.",diff:"hard"},
      {q:"מה `mapToInt()`, `mapToDouble()`?",options:["כמו map()","מחזירים IntStream/DoubleStream — ללא boxing, עם sum(), average()","מסנן לפי סוג","ממיר לCollection"],answer:1,explain:"Primitive streams מונעים boxing/unboxing. `mapToInt().sum()` יעיל לחישובים.",diff:"hard"},
      {q:"מה `Stream.generate()` ו-`Stream.iterate()`?",options:["לא קיימים","Stream אינסופי: generate מSupplier, iterate מseed וUnaryOperator","יוצרים Collection","יוצרים array"],answer:1,explain:"`Stream.generate(Math::random).limit(10)`. `iterate(0, x -> x+1).limit(10)`.",diff:"hard"},
      {q:"מה `Collectors.toUnmodifiableList()` (Java 10+)?",options:["אוסף לArrayList","אוסף לList immutable","אוסף לSet","אוסף לMap"],answer:1,explain:"`toUnmodifiableList()` = List.of() דרך Collector.",diff:"hard"},
      {q:"מה BiFunction ו-BiPredicate?",options:["לbinary operations","Functional Interfaces עם שני פרמטרי קלט","לMath","לא קיימים"],answer:1,explain:"`BiFunction<T,U,R>` — שניים, מחזיר. `BiPredicate<T,U>` — שניים, boolean.",diff:"hard"},
      {q:"מה `record` ב-Java 16+?",options:["מחלקה abstract","מחלקה לנתונים immutable עם constructor, getters, equals, hashCode, toString אוטומטיים","interface","annotation"],answer:1,explain:"`record Point(int x, int y) {}` — הקומפיילר מייצר הכל.",diff:"medium"},
      {q:"מה `Collectors.joining(delimiter)`?",options:["מחבר Collections","מחבר Strings עם מפריד: joining(\", \")","סופר מחרוזות","ממיין"],answer:1,explain:"`stream.map(Object::toString).collect(joining(\", \"))` -> \"a, b, c\".",diff:"medium"},
      {q:"מה `sorted()` עושה?",options:["מסנן","ממיין לפי Comparable/Comparator","מקבץ","מגביל"],answer:1,explain:"`sorted()` — Comparable. `sorted(Comparator.comparing(Person::getAge))`.",diff:"easy"},
    ]
  },

  concurrency: {
    label:"Multithreading & Concurrency", icon:"🔀", color:"#ec4899",
    questions:[
      {q:"מה Thread ב-Java?",options:["תוכנית שלמה","זרם ביצוע עצמאי — Thread class או Runnable","תהליך OS","מחלקה סטטית"],answer:1,explain:"Thread = thread of execution. `Thread` class או `Runnable` interface.",diff:"easy"},
      {q:"מה ההבדל בין Thread לRunnable?",options:["אין הבדל","Thread הוא class, Runnable — interface. Runnable גמיש יותר","Runnable מהיר","Thread interface"],answer:1,explain:"Runnable עדיף — אפשר לרשת ממחלקה אחרת. `new Thread(runnable).start()`.",diff:"easy"},
      {q:"מה `synchronized`?",options:["מסנכרן זמנים","מבטיח שרק thread אחד מריץ בלוק/מתודה — נועלת monitor","מהיר יותר","מבטיח סדר"],answer:1,explain:"`synchronized` נועל אובייקט — רק thread אחד בכל זמן.",diff:"easy"},
      {q:"מה Race Condition?",options:["threads במהירות שונה","תוצאת תוכנית תלויה בסדר ביצוע threads — באג קשה לאתר","exception","deadlock"],answer:1,explain:"Race condition: `counter++` לא atomic. שני threads יכולים לאבד עדכון.",diff:"easy"},
      {q:"מה deadlock?",options:["thread לאינסוף","שני threads מחכים זה לזה — שניהם תקועים לנצח","memory leak","race condition"],answer:1,explain:"Deadlock: A נועל L1 מחכה ל-L2; B נועל L2 מחכה ל-L1.",diff:"medium"},
      {q:"מה `volatile`?",options:["מהיר יותר","מבטיח שהשדה נקרא/נכתב מהזיכרון הראשי — נראה לכל threads","thread-safe","כמו synchronized"],answer:1,explain:"`volatile` מונע caching. מבטיח visibility אבל לא atomicity.",diff:"medium"},
      {q:"מה ExecutorService?",options:["שירות OS","מנהל thread pool — שליחת Runnable/Callable","מסנן exceptions","interface לIO"],answer:1,explain:"`Executors.newFixedThreadPool(4)` — מנהל threads. `submit(task)`.",diff:"medium"},
      {q:"מה Callable לעומת Runnable?",options:["אין הבדל","Callable מחזיר תוצאה ויכול לזרוק exception; Runnable לא","Callable מהיר","Runnable מחזיר ערך"],answer:1,explain:"`Callable<T>.call()` — מחזיר T, יכול לזרוק. `Runnable.run()` — void.",diff:"medium"},
      {q:"מה Future?",options:["events","מחזיק תוצאה עתידית — get() חוסם עד שמוכנה","Async callback","thread מיוחד"],answer:1,explain:"`Future<T> f = executor.submit(callable); f.get();` — חוסם עד סיום.",diff:"medium"},
      {q:"מה AtomicInteger?",options:["Integer רגיל","Integer thread-safe ללא synchronized — CAS","Integer immutable","מוגדל אוטומטית"],answer:1,explain:"`AtomicInteger.incrementAndGet()` — atomic, מהיר מ-synchronized.",diff:"medium"},
      {q:"מה daemon thread?",options:["thread חשוב","thread רקע שJVM לא מחכה לו לפני כיבוי","thread ראשי","עדיפות גבוהה"],answer:1,explain:"`thread.setDaemon(true)` — JVM מסיים כשכל non-daemon threads סיימו.",diff:"medium"},
      {q:"מה `thread.join()`?",options:["מחבר threads","מחכה שהthread יסיים לפני שממשיכים","מצרף לpool","קורא ל-run() ידנית"],answer:1,explain:"`t.join()` — הthread הנוכחי חוסם עד ש-t מסיים.",diff:"medium"},
      {q:"מה ReentrantLock לעומת synchronized?",options:["אין הבדל","ReentrantLock גמיש — tryLock(), lockInterruptibly(), fairness","synchronized מהיר תמיד","ReentrantLock אוטומטי"],answer:1,explain:"`ReentrantLock` — ניסיון נעילה עם timeout, ביטול, fairness. יותר שליטה.",diff:"hard"},
      {q:"מה CompletableFuture (Java 8+)?",options:["Future עם API async: thenApply(), thenCompose(), allOf(), exceptionally()","Thread Pool","Executor","Callable"],answer:0,explain:"`CompletableFuture` — async programming. `thenApply()` כמו map.",diff:"hard"},
      {q:"מה ThreadLocal?",options:["מידע גלובלי","ערך ייחודי לכל thread — כל thread רואה את שלו","shared variable","cache גלובלי"],answer:1,explain:"`ThreadLocal<T>` — כל thread מקבל עותק משלו.",diff:"hard"},
      {q:"מה CountDownLatch?",options:["Semaphore","threads ממתינים עד שספירה מגיעה ל-0 — await(), countDown()","lock","thread pool"],answer:1,explain:"`CountDownLatch(N)` — N threads קוראים `countDown()`, אחד ממתין ב-`await()`.",diff:"hard"},
      {q:"מה Semaphore?",options:["synchronized","מגביל גישה מרובת threads למשאב — acquire(), release()","lock בינארי","thread pool"],answer:1,explain:"`Semaphore(3)` — רק 3 threads בו-זמנית. למשל: מגבלת חיבורים.",diff:"hard"},
      {q:"מה BlockingQueue?",options:["Queue רגיל","Queue thread-safe — חוסמת ב-put() כשמלאה וב-take() כשריקה","Queue עם timeout","Queue לstreams"],answer:1,explain:"`ArrayBlockingQueue`, `LinkedBlockingQueue` — יסוד ל-Producer-Consumer.",diff:"hard"},
      {q:"מה Java Memory Model (JMM)?",options:["מבנה heap","מפרט כיצד threads רואים זיכרון משותף — visibility, ordering, atomicity","ניהול GC","מבנה stack"],answer:1,explain:"JMM מגדיר מתי שינוי ב-thread אחד נראה לאחרים. `volatile`, `synchronized` יוצרים happens-before.",diff:"hard"},
      {q:"מה `sleep()` לעומת `wait()`?",options:["אין הבדל","sleep() — ממתין ללא שחרור lock; wait() — משחרר lock, ממתין ל-notify()","wait() מהיר","sleep() קורא לwait()"],answer:1,explain:"`sleep()` — פשוט ממתין. `wait()` ב-synchronized, משחרר lock.",diff:"hard"},
      {q:"מה ForkJoinPool (Java 7+)?",options:["ThreadPool רגיל","ExecutorService ל-divide-and-conquer — work-stealing","BlockingQueue","Semaphore"],answer:1,explain:"`ForkJoinPool` — בסיס ל-parallel streams. Work-stealing מבטיח שכל thread עסוק.",diff:"hard"},
      {q:"מה `thread.interrupt()`?",options:["מסיים thread בכוח","מאותת לthread שיפסיק — thread בודק isInterrupted()","מקפיא thread","מחיל exceptions"],answer:1,explain:"`interrupt()` — אות. Thread ב-sleep/wait יזרוק `InterruptedException`. אחרת יבדוק ידנית.",diff:"medium"},
      {q:"מה `synchronized` block לעומת synchronized method?",options:["זהים","block נועל אובייקט ספציפי — גמיש יותר וחוסם פחות","method מהיר יותר","block לא קיים"],answer:1,explain:"`synchronized(lock) { }` — נועל lock ספציפי. method נועל `this` (או Class).",diff:"medium"},
      {q:"מה Livelock?",options:["כמו deadlock","threads רצים אבל לא מתקדמים — מגיבים זה לזה ומבטלים פעולות","race condition","starvation"],answer:1,explain:"Livelock: threads עסוקים אבל מגיבים אחד לשני באופן שמונע התקדמות.",diff:"hard"},
      {q:"מה Starvation ב-threading?",options:["thread שלא אוכל","thread שלא מקבל גישה למשאב — threads אחרים תמיד קודמים","deadlock","race condition"],answer:1,explain:"Starvation: thread ממתין לנצח כי threads אחרים תמיד מקבלים עדיפות.",diff:"hard"},
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  7. מצא את הבאג 🐛
  // ══════════════════════════════════════════════════════════════
  bugs: {
    label:"מצא את הבאג!", icon:"🐛", color:"#f97316",
    isCode: true,
    questions:[
      {
        q:"מה הבאג בקוד הבא?",
        code:`List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Charlie");

for (String name : names) {
    if (name.startsWith("B")) {
        names.remove(name); // 🐛
    }
}`,
        options:["אין בעיה בקוד","שינוי Collection בזמן for-each — גורם ל-ConcurrentModificationException","לא ניתן להוסיף String לArrayList","startsWith() לא קיים"],
        answer:1,
        explain:"שינוי Collection בזמן for-each גורם ל-`ConcurrentModificationException`. פתרון: `Iterator.remove()` או `removeIf(name -> name.startsWith(\"B\"))`.",
        diff:"easy"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`String s = null;

if (s.equals("hello")) { // 🐛
    System.out.println("Match!");
}`,
        options:["equals() לא עובד על null","s.equals() יגרום ל-NullPointerException כי s הוא null","צריך == במקום equals","'hello' חייב להיות בצד שמאל"],
        answer:1,
        explain:"קריאת מתודה על null גורמת ל-`NullPointerException`. פתרון: `\"hello\".equals(s)` — הפיכת הסדר בטוחה.",
        diff:"easy"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`public class Counter {
    private int count = 0;

    public void increment() {
        count++; // 🐛 (בסביבת multi-thread)
    }

    public int getCount() {
        return count;
    }
}`,
        options:["count++ לא חוקי","count++ אינו atomic — במולטי-תרד שני threads יכולים לקרוא אותו ערך ולאבד עדכון","count לא מאותחל נכון","צריך return בincrement()"],
        answer:1,
        explain:"`count++` = קרא + הוסף + כתוב — 3 פעולות, לא atomic. פתרון: `AtomicInteger` או `synchronized`.",
        diff:"medium"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`try {
    FileReader fr = new FileReader("data.txt");
    BufferedReader br = new BufferedReader(fr);
    String line = br.readLine();
    System.out.println(line);
} catch (IOException e) {
    e.printStackTrace();
}
// 🐛 br ו-fr לא נסגרו!`,
        options:["FileReader לא קיים","br ו-fr לא נסגרים — resource leak. יש להשתמש ב-try-with-resources","catch לא תופס IOException","readLine() לא קיים"],
        answer:1,
        explain:"פתרון: `try (BufferedReader br = new BufferedReader(new FileReader(\"data.txt\"))) { ... }` — נסגר אוטומטית.",
        diff:"easy"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`public class Singleton {
    private static Singleton instance;

    public static Singleton getInstance() {
        if (instance == null) {         // 🐛
            instance = new Singleton(); // שני threads יכולים להגיע לכאן
        }
        return instance;
    }
}`,
        options:["Singleton לא ניתן לאתחל","אין thread-safety — שני threads יכולים ליצור שני instances שונים","instance לא static","צריך throws"],
        answer:1,
        explain:"פתרון: `synchronized getInstance()`, double-checked locking, או `private static final Singleton INSTANCE = new Singleton()`.",
        diff:"medium"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`int[] arr = {1, 2, 3, 4, 5};

for (int i = 0; i <= arr.length; i++) { // 🐛
    System.out.println(arr[i]);
}`,
        options:["לולאת for שגויה","i <= arr.length גורם ל-ArrayIndexOutOfBoundsException בitereration האחרון","arr.length לא קיים","int[] לא תקין"],
        answer:1,
        explain:"האינדקס האחרון הוא `arr.length - 1`. `i <= arr.length` ניגשת ל-`arr[5]` שלא קיים. תיקון: `i < arr.length`.",
        diff:"easy"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`HashMap<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.put("b", 2);

int sum = 0;
for (String key : map.keySet()) {
    sum = sum + map.get(key);
}
System.out.println(sum);
// הקוד יכול לזרוק exception לפעמים — למה?`,
        options:["map.get() מחזיר null לפעמים — auto-unboxing של null גורם ל-NullPointerException","keySet() לא קיים","sum לא מאותחל","HashMap לא תומך String"],
        answer:0,
        explain:"אם הערך הוא `null`, `map.get(key)` מחזיר `null` ו-unboxing גורם ל-NPE. פתרון: `getOrDefault(key, 0)`.",
        diff:"medium"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`public static int factorial(int n) {
    return n * factorial(n - 1); // 🐛
}`,
        options:["factorial לא יכול לקרוא לעצמה","חסר תנאי עצירה — רקורסיה אינסופית תגרום ל-StackOverflowError","n * לא חוקי","צריך long"],
        answer:1,
        explain:"חסר תנאי בסיס! תיקון: `if (n <= 1) return 1; return n * factorial(n - 1);`",
        diff:"easy"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
numbers.add(6); // 🐛`,
        options:["Arrays.asList() מחזיר רשימה בגודל קבוע — add() זורקת UnsupportedOperationException","Integer לא תואם ל-int","Arrays.asList() לא קיים","add() צריך index"],
        answer:0,
        explain:"`Arrays.asList()` מחזיר רשימה בגודל קבוע. אפשר לשנות ערכים אבל לא לשנות גודל. פתרון: `new ArrayList<>(Arrays.asList(...))`.",
        diff:"easy"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`String str = "Hello";
str.toUpperCase(); // 🐛
System.out.println(str);`,
        options:["toUpperCase() לא קיים","String immutable — toUpperCase() מחזיר String חדש, המקורי לא משתנה","println() לא יעבוד","Hello לא תקין"],
        answer:1,
        explain:"String הוא immutable. `toUpperCase()` מחזיר String חדש. תיקון: `str = str.toUpperCase();`",
        diff:"easy"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`public class DeadlockDemo {
    static Object lock1 = new Object();
    static Object lock2 = new Object();

    static void thread1() {
        synchronized (lock1) {
            synchronized (lock2) { } // נועל lock1 ואז lock2
        }
    }

    static void thread2() {
        synchronized (lock2) {
            synchronized (lock1) { } // 🐛 נועל lock2 ואז lock1
        }
    }
}`,
        options:["synchronized לא ניתן להשתמש על Object","סדר נעילה הפוך בין thread1 לthread2 — Deadlock אפשרי","lock1 ו-lock2 לא static","threads לא יכולים לנעול אותו lock"],
        answer:1,
        explain:"Deadlock: thread1 נועל lock1 ומחכה ל-lock2; thread2 נועל lock2 ומחכה ל-lock1. פתרון: תמיד לנעול בסדר קבוע.",
        diff:"medium"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`int result = 5 / 0; // 🐛
System.out.println(result);`,
        options:["5 / 0 מחזיר Infinity","חלוקת int באפס זורקת ArithmeticException","חלוקת int באפס מחזירה 0","שגיאת קומפילציה"],
        answer:1,
        explain:"חלוקת **int** באפס -> `ArithmeticException: / by zero`. חלוקת **double** באפס -> `Infinity`. תיקון: בדיקת מחלק לפני חלוקה.",
        diff:"easy"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`public class MyClass implements Serializable {
    private Connection dbConnection; // 🐛
    private String name;
}`,
        options:["Serializable לא ניתן לממש","Connection אינה Serializable — serialization יזרוק NotSerializableException","String לא תואמת","name חייב להיות public"],
        answer:1,
        explain:"`Connection` אינה `Serializable`. פתרון: `transient Connection dbConnection;` — ישמיט אותה מה-serialization.",
        diff:"medium"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`Map<String, List<String>> map = new HashMap<>();

List<String> list = map.get("key"); // יכול להיות null
list.add("value"); // 🐛`,
        options:["HashMap לא תומך List כvalue","map.get() יכול להחזיר null — list.add() יזרוק NullPointerException","add() צריך index","String לא תואמת"],
        answer:1,
        explain:"פתרון: `map.computeIfAbsent(\"key\", k -> new ArrayList<>()).add(\"value\");` — בטוח ויעיל.",
        diff:"medium"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`public boolean equals(Object obj) {
    MyClass other = (MyClass) obj; // 🐛
    return this.name.equals(other.name);
}`,
        options:["equals() חייב להחזיר int","cast ללא בדיקה — ClassCastException אם obj מסוג אחר, NPE אם null","this.name לא ניגש נכון","obj חייב להיות MyClass"],
        answer:1,
        explain:"תיקון: `if (obj == null || !(obj instanceof MyClass)) return false; MyClass other = (MyClass) obj;`",
        diff:"medium"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`public static void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

int x = 5, y = 10;
swap(x, y);
System.out.println(x + " " + y); // 🐛 מה יודפס?`,
        options:["10 5","5 10 — Java מעבירה primitive בvalue, swap לא ישפיע על x ו-y המקוריים","שגיאת קומפילציה","0 0"],
        answer:1,
        explain:"Java מעבירה primitives **by value**. הפונקציה מחליפה עותקים מקומיים. x ו-y יישארו 5 ו-10.",
        diff:"medium"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`class Animal {
    public void sound() { System.out.println("..."); }
}

class Dog extends Animal {
    public void sound() { System.out.println("Woof"); }
}

Animal a = new Dog();
a.sound(); // מה יקרה?`,
        options:["שגיאת קומפילציה","יקרא ל-Dog.sound() — Dynamic Dispatch. יודפס: Woof","יקרא ל-Animal.sound() — יודפס: ...","NullPointerException"],
        answer:1,
        explain:"Dynamic Dispatch — בזמן ריצה Java בוחרת לפי הסוג האמיתי (Dog). `Woof` יודפס.",
        diff:"easy"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`String result = "";
for (int i = 0; i < 10000; i++) {
    result += "a"; // 🐛
}`,
        options:["String לא תומך +=","String immutable — כל += יוצר String חדש — O(n²) זיכרון וזמן","לולאה שגויה","10000 גדול מדי"],
        answer:1,
        explain:"כל `+=` יוצר String חדש. 10000 איטרציות = 10000 Strings. פתרון: `StringBuilder sb = new StringBuilder(); sb.append(\"a\");`",
        diff:"medium"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`Integer a = 1000;
Integer b = 1000;

if (a == b) { // 🐛
    System.out.println("Equal!");
} else {
    System.out.println("Not Equal!");
}`,
        options:["Integer לא תומך ==","== משווה references לא ערכים — עבור Integer מחוץ לטווח [-128,127], a ו-b הם objects שונים","1000 גדול מדי","Integer לא Comparable"],
        answer:1,
        explain:"Java מטמינה (cache) Integer בטווח -128 עד 127. מחוץ לטווח — `==` ישווה references ויחזיר false. פתרון: `a.equals(b)`.",
        diff:"hard"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`public static List<String> getNames() {
    List<String> names = new ArrayList<>();
    names.add("Alice");
    return names;
}

List<String> result = getNames();
result.add("Bob"); // האם זה בטוח?`,
        options:["ArrayList לא ניתן להחזיר ממתודה","זה בטוח — המתודה מחזירה עותק","זה בעייתי — הcaller יכול לשנות את הרשימה הפנימית אם האובייקט נשמר","add() צריך index"],
        answer:2,
        explain:"הcaller מקבל reference לאותו ArrayList. אם המתודה שומרת reference פנימי — הcaller יכול לשנות נתונים פנימיים. פתרון: `Collections.unmodifiableList()` או העברת עותק.",
        diff:"hard"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`try {
    int result = riskyOperation();
    return result;
} catch (Exception e) {
    e.printStackTrace(); // 🐛
    return -1;
} finally {
    System.out.println("Done");
    return 0; // 🐛
}`,
        options:["finally לא יכול להחזיר ערך","return בfinally מחליף כל return/exception אחר — תמיד מוחזר 0, הexception נבלע","printStackTrace() שגוי","catch לא תופס Exception"],
        answer:1,
        explain:"`return` בבלוק `finally` מחליף את ה-return מ-try/catch ובולע exceptions. נחשב לbad practice חמור.",
        diff:"hard"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`public class LazyInit {
    private static LazyInit instance;

    public static LazyInit getInstance() {
        if (instance == null) {
            synchronized (LazyInit.class) {
                instance = new LazyInit(); // 🐛
            }
        }
        return instance;
    }
}`,
        options:["synchronized שגוי","חסרה בדיקה נוספת בתוך synchronized — double-checked locking לא שלם","getInstance() לא static","LazyInit.class שגוי"],
        answer:1,
        explain:"Double-checked locking: חסרה בדיקה `if (instance == null)` *בתוך* הsynchronized. בלי זה — שני threads יכולים ליצור שני instances.",
        diff:"hard"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`List<Integer> nums = List.of(3, 1, 4, 1, 5);
Collections.sort(nums); // 🐛`,
        options:["List.of() לא תומך Integer","List.of() מחזיר List immutable — sort() יזרוק UnsupportedOperationException","Collections.sort() צריך Comparator","nums לא מסוג List"],
        answer:1,
        explain:"`List.of()` = immutable. `sort()` מנסה לשנות — `UnsupportedOperationException`. פתרון: `new ArrayList<>(List.of(...))`.",
        diff:"medium"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`class Parent {
    public Parent(String name) {
        System.out.println("Parent: " + name);
    }
}

class Child extends Parent {
    public Child() { // 🐛
        System.out.println("Child");
    }
}`,
        options:["Child לא יכול לרשת מParent","חסר קריאה ל-super(name) — הקומפיילר לא יוסיף super() כי לParent אין default constructor","Child() לא יכול להיות public","System.out שגוי"],
        answer:1,
        explain:"כיוון שParent אין לו default constructor (יש רק `Parent(String)`), Child חייבת לקרוא `super(\"someName\")` במפורש.",
        diff:"medium"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`Optional<String> opt = Optional.empty();
String value = opt.get(); // 🐛`,
        options:["Optional לא תומך String","get() על Optional ריק זורק NoSuchElementException","empty() לא קיים","צריך isPresent() קודם"],
        answer:1,
        explain:"`Optional.get()` על Optional ריק זורק `NoSuchElementException`. פתרון: `opt.orElse(\"default\")` או `opt.orElseThrow()`.",
        diff:"easy"
      },
      {
        q:"מה הבאג בקוד הבא?",
        code:`Stream<String> stream = List.of("a","b","c").stream();
stream.forEach(System.out::println);
stream.forEach(System.out::println); // 🐛`,
        options:["forEach() מקבל פרמטר שגוי","Stream לא ניתן לשימוש חוזר — הפעלה שנייה תזרוק IllegalStateException","List.of() לא תומך stream()","println שגוי"],
        answer:1,
        explain:"Stream ניתן לצריכה פעם אחת בלבד. הפעלה שנייה זורקת `IllegalStateException: stream has already been operated upon or closed`.",
        diff:"medium"
      },
    ]
  }
};

// ══════════════════════════════════════════════════════════════════
//  Utils + Theme
// ══════════════════════════════════════════════════════════════════
const TOPIC_KEYS = ["files","exceptions","oop","collections","streams","concurrency","bugs"];
const COUNT_OPTIONS = [10, 15, 20, 30];
function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function pick(arr,n){ return shuffle(arr).slice(0,Math.min(n,arr.length)); }

const C = {
  bg:"#f0f6ff", card:"#ffffff", cardH:"#e8f0fd",
  border:"#d0dff0", border2:"#b0c8e8",
  text:"#1a2540", muted:"#4a6080", dim:"#8aa0bc",
  green:"#16a34a", red:"#dc2626", yellow:"#b45309",
  java:"#c96a00", orange:"#ea580c",
};

const FONT = "'JetBrains Mono','Fira Code',monospace";

// ── ProgressRing ───────────────────────────────────────────────────
function ProgressRing({ pct }) {
  const r=50, circ=2*Math.PI*r;
  const col = pct>=80?C.green:pct>=60?C.yellow:C.red;
  return (
    <div style={{ position:"relative",width:120,height:120,margin:"0 auto 1rem" }}>
      <svg width="120" height="120" style={{ transform:"rotate(-90deg)" }}>
        <circle cx="60" cy="60" r={r} fill="none" stroke={C.border2} strokeWidth="9"/>
        <circle cx="60" cy="60" r={r} fill="none" stroke={col} strokeWidth="9"
          strokeDasharray={circ} strokeDashoffset={circ-(pct/100)*circ}
          strokeLinecap="round" style={{ transition:"stroke-dashoffset .8s ease" }}/>
      </svg>
      <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
        <span style={{ fontSize:26,fontWeight:800,color:C.text }}>{pct}%</span>
        <span style={{ fontSize:10,color:C.muted }}>ציון</span>
      </div>
    </div>
  );
}

// ── CodeBlock ──────────────────────────────────────────────────────
function CodeBlock({ code }) {
  const lines = code.split("\n");
  return (
    <pre style={{
      background:"#1a2535", border:`1px solid #2d4060`,
      borderRadius:10, padding:"1rem", margin:"0.8rem 0",
      overflowX:"auto", fontFamily:FONT, fontSize:13,
      lineHeight:1.7, textAlign:"left", direction:"ltr",
    }}>
      {lines.map((line, i) => {
        const isBug = line.includes("// 🐛") || line.includes("// שני threads");
        return (
          <div key={i} style={{
            background: isBug ? "rgba(220,38,38,0.10)" : "transparent",
            borderLeft: isBug ? `3px solid ${C.red}` : "3px solid transparent",
            paddingLeft:6, marginLeft:-6,
          }}>
            <span style={{ color:"#405070", userSelect:"none", marginRight:12, fontSize:11 }}>
              {String(i+1).padStart(2,"0")}
            </span>
            {tokenize(line)}
          </div>
        );
      })}
    </pre>
  );
}

function tokenize(line) {
  // simple syntax highlight
  const keywords = /\b(public|private|static|final|class|new|return|for|if|else|void|int|String|boolean|null|this|super|true|false|extends|implements|try|catch|finally|throws|throw|synchronized|volatile|import|package|abstract|interface)\b/g;
  const strings = /"[^"]*"/g;
  const comments = /(\/\/.*)/g;
  const types = /\b(ArrayList|HashMap|List|Map|Set|Iterator|Thread|Integer|Object|Exception|Optional|Stream|Collectors|Arrays|Collections|FileReader|BufferedReader|Connection|Serializable|Singleton|LazyInit|Animal|Dog|Parent|Child|MyClass|Counter|DeadlockDemo)\b/g;
  const numbers = /\b(\d+)\b/g;

  let parts = [];
  let last = 0;
  const segments = [];

  // collect all ranges
  const addSegments = (regex, color) => {
    let m;
    const r = new RegExp(regex.source, regex.flags);
    while ((m = r.exec(line)) !== null) {
      segments.push({ start:m.index, end:m.index+m[0].length, text:m[0], color });
    }
  };

  // order matters for comments (must be last to override)
  addSegments(strings, "#a3e635");
  addSegments(types, "#67e8f9");
  addSegments(keywords, "#c084fc");
  addSegments(numbers, "#fb923c");
  addSegments(comments, "#6b7280");

  // sort and de-overlap
  segments.sort((a,b) => a.start - b.start);
  const used = [];
  for (const s of segments) {
    if (used.length && used[used.length-1].end > s.start) continue;
    used.push(s);
  }

  let pos = 0;
  const result = [];
  for (const s of used) {
    if (s.start > pos) result.push(<span key={pos} style={{ color:"#e8f0ff" }}>{line.slice(pos,s.start)}</span>);
    result.push(<span key={s.start} style={{ color:s.color }}>{s.text}</span>);
    pos = s.end;
  }
  if (pos < line.length) result.push(<span key={pos} style={{ color:"#e8f0ff" }}>{line.slice(pos)}</span>);
  return result.length ? result : <span style={{ color:"#e8f0ff" }}>{line}</span>;
}

// ── HomeScreen ─────────────────────────────────────────────────────
function HomeScreen({ onStart }) {
  const [topic, setTopic] = useState(null);
  const [count, setCount] = useState(20);
  const [diff, setDiff] = useState("all");
  const [hover, setHover] = useState(null);
  const total = TOPIC_KEYS.reduce((s,k) => s + QUESTION_BANK[k].questions.length, 0);
  const sel = topic ? QUESTION_BANK[topic] : null;
  const avail = sel ? (diff==="all" ? sel.questions.length : sel.questions.filter(q=>q.diff===diff).length) : 0;

  return (
    <div style={{ maxWidth:700, margin:"0 auto", padding:"2rem 1rem", fontFamily:FONT, color:C.text }}>
      <div style={{ textAlign:"center", marginBottom:"2rem" }}>
        <div style={{ display:"inline-block", background:"rgba(248,152,32,.1)", border:"1px solid rgba(248,152,32,.35)", borderRadius:100, padding:"4px 18px", fontSize:11, color:C.java, letterSpacing:".12em", marginBottom:".9rem" }}>
          ☕ JAVA INTERACTIVE TRAINER
        </div>
        <h1 style={{ fontSize:"clamp(1.7rem,4vw,2.5rem)", fontWeight:900, lineHeight:1.1, marginBottom:".6rem", background:`linear-gradient(135deg,#1a2540,#2563eb)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          למד Java תוך כדי משחק
        </h1>
        <p style={{ color:C.muted, fontSize:13, maxWidth:480, margin:"0 auto" }}>
          {total} שאלות ב-7 נושאים • כולל 🐛 מצא את הבאג!
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(195px,1fr))", gap:10, marginBottom:"1.5rem" }}>
        {TOPIC_KEYS.map(k => {
          const t = QUESTION_BANK[k], s = topic===k;
          const isBug = k === "bugs";
          return (
            <div key={k} onClick={() => setTopic(s?null:k)}
              onMouseEnter={() => setHover(k)} onMouseLeave={() => setHover(null)}
              style={{
                background: s ? `${t.color}12` : hover===k ? C.cardH : C.card,
                border: `1.5px solid ${s ? t.color : hover===k ? C.border2 : C.border}`,
                borderRadius:14, padding:"1rem", cursor:"pointer", transition:"all .18s",
                boxShadow: s ? `0 4px 20px ${t.color}30` : hover===k ? "0 4px 16px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.05)",
                position:"relative", overflow:"hidden"
              }}>
              {isBug && <div style={{ position:"absolute",top:6,right:8,fontSize:9,color:C.orange,background:"rgba(249,115,22,.15)",border:"1px solid rgba(249,115,22,.3)",borderRadius:4,padding:"1px 6px",letterSpacing:".08em" }}>NEW</div>}
              <div style={{ fontSize:26, marginBottom:6 }}>{t.icon}</div>
              <div style={{ fontWeight:700, fontSize:13, color:s?t.color:C.text, marginBottom:4 }}>{t.label}</div>
              <div style={{ fontSize:11, color:C.dim }}>{t.questions.length} שאלות</div>
            </div>
          );
        })}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:"1.4rem" }}>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1rem" }}>
          <div style={{ fontSize:11, color:C.muted, marginBottom:8, letterSpacing:".08em" }}>מספר שאלות</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {COUNT_OPTIONS.map(n => (
              <button key={n} onClick={() => setCount(n)}
                style={{ padding:"5px 12px", borderRadius:8, border:`1px solid ${count===n?C.java:C.border}`, background:count===n?"rgba(248,152,32,.15)":"none", color:count===n?C.java:C.muted, cursor:"pointer", fontFamily:FONT, fontSize:13, fontWeight:700 }}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1rem" }}>
          <div style={{ fontSize:11, color:C.muted, marginBottom:8, letterSpacing:".08em" }}>רמת קושי</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {[["all","הכל","#7a90b0"],["easy","קל",C.green],["medium","בינוני",C.yellow],["hard","קשה",C.red]].map(([v,lbl,col]) => (
              <button key={v} onClick={() => setDiff(v)}
                style={{ padding:"5px 12px", borderRadius:8, border:`1px solid ${diff===v?col:C.border}`, background:diff===v?`${col}18`:"none", color:diff===v?col:C.muted, cursor:"pointer", fontFamily:FONT, fontSize:13, fontWeight:700 }}>
                {lbl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {topic && (
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"1rem", marginBottom:"1rem", display:"flex", alignItems:"center", justifyContent:"space-between", direction:"rtl" }}>
          <span style={{ color:sel.color, fontWeight:700 }}>{sel.icon} {sel.label}</span>
          <span style={{ fontSize:12, color:C.dim }}>{Math.min(count,avail)} / {avail} שאלות זמינות</span>
        </div>
      )}

      <button onClick={() => topic && onStart({ topic, count, diff })} disabled={!topic}
        style={{ width:"100%", padding:"1rem", background:topic?`linear-gradient(135deg,${sel?.color||"#3b82f6"},#8b5cf6)`:"#d0dff0", border:"none", borderRadius:14, color:topic?"#fff":C.dim, fontFamily:FONT, fontWeight:800, fontSize:15, cursor:topic?"pointer":"not-allowed", transition:"all .2s", letterSpacing:".04em" }}>
        {topic ? "🚀 התחל חידון" : "← בחר נושא כדי להתחיל"}
      </button>
      <div style={{ textAlign:"center", fontSize:11, color:C.dim, marginTop:"1rem" }}>
        כל הרצה — שאלות מוגרלות שונות מהמאגר
      </div>
    </div>
  );
}

// ── QuizScreen ─────────────────────────────────────────────────────
function QuizScreen({ config, onFinish, onHome }) {
  const { topic, count, diff } = config;
  const td = QUESTION_BANK[topic];
  const isBugMode = td.isCode === true;

  const [questions] = useState(() => {
    let pool = diff==="all" ? td.questions : td.questions.filter(q => q.diff===diff);
    return pick(pool, count).map(q => ({
      ...q,
      _opts: q.options.map((o,i) => ({ text:o, orig:i })).sort(() => Math.random()-.5)
    }));
  });

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongs, setWrongs] = useState([]);

  if (!questions.length) return (
    <div style={{ maxWidth:700, margin:"0 auto", padding:"3rem 1rem", textAlign:"center", fontFamily:FONT, color:C.text }}>
      <div style={{ fontSize:40, marginBottom:"1rem" }}>😅</div>
      <p style={{ color:C.muted }}>אין שאלות זמינות לרמת הקושי שנבחרה.</p>
      <button onClick={onHome} style={{ marginTop:"1rem", padding:".8rem 2rem", background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, color:C.muted, cursor:"pointer", fontFamily:FONT }}>← חזרה</button>
    </div>
  );

  const q = questions[idx];
  const correctIdx = q._opts.findIndex(o => o.orig === q.answer);
  const pct = Math.round((idx/questions.length)*100);
  const diffColor = { easy:C.green, medium:C.yellow, hard:C.red }[q.diff] || C.muted;
  const diffLabel = { easy:"קל", medium:"בינוני", hard:"קשה" }[q.diff] || "";

  function choose(i) {
    if (revealed) return;
    setSelected(i); setRevealed(true);
    if (i===correctIdx) setScore(s=>s+1);
    else setWrongs(w => [...w, { q:q.q, code:q.code, correct:q.options[q.answer] }]);
  }

  function next() {
    if (idx+1>=questions.length) onFinish({ score, total:questions.length, wrongs });
    else { setIdx(i=>i+1); setSelected(null); setRevealed(false); }
  }

  return (
    <div style={{ maxWidth:700, margin:"0 auto", padding:"1.5rem 1rem", fontFamily:FONT, color:C.text }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <span style={{ fontSize:12, color:C.muted }}>שאלה {idx+1} / {questions.length}</span>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <span style={{ fontSize:12, color:C.green }}>✓ {score}</span>
          <span style={{ fontSize:12, color:C.red }}>✗ {idx-score}</span>
          <button onClick={onHome} style={{ background:"none", border:"none", color:C.dim, cursor:"pointer", fontSize:12 }}>← יציאה</button>
        </div>
      </div>
      {/* Progress */}
      <div style={{ height:4, background:C.border, borderRadius:99, marginBottom:"1.2rem" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${td.color},#8b5cf6)`, borderRadius:99, transition:"width .3s" }}/>
      </div>

      {/* Question card */}
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:"1.4rem", marginBottom:"1rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:".8rem" }}>
          <span style={{ fontSize:11, color:td.color, letterSpacing:".1em" }}>{td.icon} {td.label.toUpperCase()}</span>
          <span style={{ fontSize:10, color:diffColor, background:`${diffColor}18`, border:`1px solid ${diffColor}40`, borderRadius:6, padding:"2px 8px" }}>{diffLabel}</span>
        </div>
        <p style={{ fontSize:15, lineHeight:1.75, fontWeight:600, color:C.text, margin:0, direction:"rtl", textAlign:"right" }}>{q.q}</p>
        {q.code && <CodeBlock code={q.code} />}
      </div>

      {/* Options */}
      <div style={{ display:"grid", gap:8, marginBottom:"1rem" }}>
        {q._opts.map((opt, i) => {
          const isC=i===correctIdx, isS=i===selected;
          let bg=C.card, border=C.border, color=C.text;
          if (revealed) {
            if (isC) { bg="rgba(22,163,74,.08)"; border=C.green; color=C.green; }
            else if (isS) { bg="rgba(220,38,38,.08)"; border=C.red; color=C.red; }
          } else if (isS) { bg="rgba(37,99,235,.08)"; border="#2563eb"; color="#2563eb"; }
          return (
            <div key={i} onClick={() => choose(i)}
              style={{ background:bg, border:`1px solid ${border}`, borderRadius:12, padding:".85rem 1.1rem", cursor:revealed?"default":"pointer", color, fontFamily:FONT, fontSize:14, display:"flex", alignItems:"flex-start", gap:".8rem", transition:"all .14s", direction:"rtl" }}>
              <span style={{ fontWeight:800, color:border, minWidth:22, fontSize:12, flexShrink:0, marginTop:2 }}>
                {revealed ? (isC?"✓":isS?"✗":String.fromCharCode(65+i)) : String.fromCharCode(65+i)}
              </span>
              <span style={{ flex:1, textAlign:"right", lineHeight:1.6 }}>{opt.text}</span>
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      {revealed && (
        <div style={{ background:"rgba(37,99,235,.06)", border:"1px solid rgba(37,99,235,.2)", borderRadius:12, padding:"1rem 1.2rem", marginBottom:"1rem", direction:"rtl", textAlign:"right" }}>
          <div style={{ fontSize:11, color:"#2563eb", marginBottom:6, letterSpacing:".1em" }}>💡 הסבר</div>
          <p style={{ margin:0, fontSize:13, color:C.muted, lineHeight:1.75 }}>{q.explain}</p>
        </div>
      )}
      {revealed && (
        <button onClick={next}
          style={{ width:"100%", padding:".9rem", background:`linear-gradient(135deg,${td.color},#8b5cf6)`, border:"none", borderRadius:12, color:"#fff", fontFamily:FONT, fontWeight:700, fontSize:14, cursor:"pointer", letterSpacing:".04em" }}>
          {idx+1>=questions.length ? "📊 סיום ותוצאות" : "שאלה הבאה ←"}
        </button>
      )}
    </div>
  );
}

// ── ScoreScreen ────────────────────────────────────────────────────
function ScoreScreen({ config, result, onRetry, onHome }) {
  const { score, total, wrongs } = result;
  const pct = Math.round((score/total)*100);
  const grade = pct>=90?"מצוין! 🏆":pct>=75?"טוב מאוד 👍":pct>=60?"סביר 📚":"יש עוד לתרגל 💪";
  const td = QUESTION_BANK[config.topic];

  return (
    <div style={{ maxWidth:700, margin:"0 auto", padding:"2rem 1rem", fontFamily:FONT, color:C.text }}>
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:18, padding:"2rem 1.5rem", textAlign:"center", marginBottom:"1.5rem" }}>
        <ProgressRing pct={pct}/>
        <h2 style={{ fontSize:22, fontWeight:800, marginBottom:4, color:C.text }}>{grade}</h2>
        <p style={{ color:C.muted, fontSize:14 }}>{score} מתוך {total} נכון</p>
        <div style={{ display:"flex", justifyContent:"center", gap:"2rem", marginTop:"1rem" }}>
          {[["✓",score,C.green,"נכון"],["✗",total-score,C.red,"שגוי"]].map(([sym,val,col,lbl]) => (
            <div key={lbl} style={{ textAlign:"center" }}>
              <div style={{ fontSize:26, fontWeight:800, color:col }}>{val}</div>
              <div style={{ fontSize:11, color:C.dim }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:"1rem", fontSize:12, color:C.dim }}>
          {td.icon} {td.label} • {{all:"כל הרמות",easy:"קל",medium:"בינוני",hard:"קשה"}[config.diff]} • {total} שאלות
        </div>
      </div>

      {wrongs.length > 0 && (
        <div style={{ marginBottom:"1.5rem" }}>
          <h3 style={{ fontSize:14, color:C.red, marginBottom:".8rem", direction:"rtl" }}>❌ שאלות שהחמצת ({wrongs.length})</h3>
          {wrongs.map((w,i) => (
            <div key={i} style={{ background:"rgba(220,38,38,.06)", border:"1px solid rgba(220,38,38,.2)", borderRadius:10, padding:".9rem", marginBottom:8, direction:"rtl", textAlign:"right" }}>
              <div style={{ fontSize:13, color:C.text, marginBottom:4 }}>{w.q}</div>
              {w.code && <div style={{ fontSize:11, color:C.dim, marginBottom:6 }}>📋 שאלת קוד</div>}
              <div style={{ fontSize:12, color:C.green }}>✓ {w.correct}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        <button onClick={onRetry}
          style={{ padding:".9rem", background:`linear-gradient(135deg,${td.color},#8b5cf6)`, border:"none", borderRadius:12, color:"#fff", fontFamily:FONT, fontWeight:700, fontSize:14, cursor:"pointer" }}>
          🔁 סיבוב נוסף עם אותן הגדרות
        </button>
        <button onClick={onHome}
          style={{ padding:".9rem", background:"#fff", border:`1px solid ${C.border}`, borderRadius:12, color:C.muted, fontFamily:FONT, fontSize:14, cursor:"pointer" }}>
          ← בחר נושא / הגדרות אחרות
        </button>
      </div>
    </div>
  );
}

// ── App root ───────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [config, setConfig] = useState(null);
  const [result, setResult] = useState(null);
  const total = TOPIC_KEYS.reduce((s,k) => s+QUESTION_BANK[k].questions.length, 0);

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:FONT }}>
      <header style={{ background:`linear-gradient(90deg,#ffffff,#f0f6ff)`, borderBottom:`1px solid ${C.border}`, padding:".8rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize:18, fontWeight:700, color:C.java }}>☕ Java<span style={{ color:C.muted, fontWeight:400 }}>Trainer</span></div>
        <div style={{ fontSize:11, color:C.dim }}>{total} שאלות • 7 נושאים</div>
      </header>
      {screen==="home"  && <HomeScreen  onStart={cfg => { setConfig(cfg); setScreen("quiz"); }}/>}
      {screen==="quiz"  && <QuizScreen  key={JSON.stringify(config)} config={config} onFinish={r => { setResult(r); setScreen("score"); }} onHome={() => setScreen("home")}/>}
      {screen==="score" && <ScoreScreen config={config} result={result} onRetry={() => setScreen("quiz")} onHome={() => setScreen("home")}/>}
    </div>
  );
}
