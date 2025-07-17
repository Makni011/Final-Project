// دالة لجلب بيانات المدن وعرضها في الصفحة
async function loadCities() {
  try {
    // جلب ملف JSON الذي يحتوي بيانات المدن
    const response = await fetch("cities.json");
    // تحويل الرد إلى JSON (مصفوفة كائنات المدن)
    const cities = await response.json();

    // تحديد العنصر الذي سنعرض فيه كروت المدن
    const container = document.getElementById("citiesContainer");

    // إنشاء كود HTML لكل مدينة باستخدام map
    const cards = cities.map(city => {
      return `
        <article class="card"> <!-- بطاقة مدينة -->
          <img src="${city.image}" alt="${city.name}" class="w-full h-56 object-cover" /> <!-- صورة المدينة -->
          <section class="p-4"> <!-- محتوى نصي داخل البطاقة -->
            <h3 class="text-xl font-semibold text-blue-800 mb-2">${city.name}</h3> <!-- اسم المدينة -->
            <p class="text-gray-800">${city.description}</p> <!-- وصف المدينة -->
          </section>
        </article>
      `;
    });

    // عرض الكروت داخل الحاوية
    container.innerHTML = cards.join("");
  } catch (error) {
    // في حالة حدوث خطأ، عرض رسالة خطأ أنيقة في الصفحة
    const container = document.getElementById("citiesContainer");
    container.innerHTML = `
      <p style="
        color: #aee2f9; 
        text-shadow: 0 1px 4px rgba(0,0,0,0.4); 
        font-size: 0.9rem; 
        text-align: center;
        margin-top: 20px;
      ">
        ⚠️ Error loading cities. Please try again later.
      </p>
    `;
  }
}

// دالة لجلب الطقس والوقت لتونس وعرضهما في الصفحة
async function loadWeatherAndTime() {
  try {
    const apiKey = "75905d7e7eca947c6b7b3725f1bb68f0"; // ضع هنا مفتاح API الخاص بك من OpenWeatherMap

    // إحداثيات تونس
    const lat = 36.8;
    const lon = 10.18;

    // جلب بيانات الطقس من OpenWeatherMap (الوحدة: مئوية)
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherResponse.json();

    // استخراج بيانات الطقس المطلوبة
    const temp = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // تحديث عناصر الطقس في الصفحة
    document.getElementById("weatherIcon").src = iconUrl;
    document.getElementById("weatherIcon").alt = description;
    document.getElementById("weatherDesc").textContent = description;
    document.getElementById("temperature").textContent = `${temp}°C`;

    // تحديث الوقت كل ثانية
    function updateTime() {
      const now = new Date();

      // تحويل الوقت إلى توقيت تونس (UTC+1 أو UTC+2 حسب التوقيت الصيفي)
      // لتبسيطنا هنا نستخدم توقيت UTC+1 (توقيت وسط أوروبا)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const tunisiaTime = new Date(utc + 3600000); // UTC+1 = 3600000 ميللي ثانية

      // تنسيق الوقت بالساعات والدقائق والثواني
      const hours = tunisiaTime.getHours().toString().padStart(2, '0');
      const minutes = tunisiaTime.getMinutes().toString().padStart(2, '0');
      const seconds = tunisiaTime.getSeconds().toString().padStart(2, '0');

      const formattedTime = `${hours}:${minutes}:${seconds}`;

      document.getElementById("time").textContent = formattedTime;
    }

    updateTime(); // تحديث أولي
    setInterval(updateTime, 1000); // تحديث كل ثانية
  } catch (error) {
    console.error("Error loading weather or time:", error);
    // في حالة الخطأ يمكن إظهار رسالة بديلة أو ترك الركن فارغ
    document.getElementById("weatherTime").textContent = "Unable to load weather/time";
  }
}

// تشغيل تحميل المدن والطقس والوقت عند تحميل الصفحة
loadCities();
loadWeatherAndTime();