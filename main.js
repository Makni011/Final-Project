// async → كلمة مفتاحية تعلن أن الدالة غير متزامنة / keyword indicating the function is asynchronous
// function → يبدأ بتعريف دالة / starts defining a function
// loadCities → اسم الدالة (تحميل المدن) / function name (load cities)
async function loadCities() {
  try { // try → جرب تنفيذ الكود، للتحكم في الأخطاء / try block to catch errors

    // const → إعلان عن متغير ثابت / declare a constant variable
    // response → اسم المتغير الذي يحمل الرد من السيرفر / variable holding server response
    // = → إسناد القيمة إلى المتغير / assign value
    // await → تابع التنفيذ بعد اكتمال fetch / wait for promise to resolve
    // fetch → جلب ملف أو بيانات من رابط خارجي / fetches file or data from a URL
    const response = await fetch("cities.json"); // جلب ملف بيانات المدن / fetch the cities.json file

    // const cities → إعلان متغير ثابت باسم cities / declare constant variable named cities
    // = await response.json() → تحويل الرد إلى JSON / convert the response to JSON
    const cities = await response.json(); // مصفوفة كائنات المدن / array of city objects

    // const container → تحديد مكان عرض الكروت / variable for HTML container
    // = document.getElementById(...) → اختيار عنصر من الصفحة حسب ID / select element by ID
    const container = document.getElementById("citiesContainer"); // الحاوية لعرض بطاقات المدن / container for city cards

    // const cards → مصفوفة جديدة تحتوي كود HTML لكل بطاقة / new array holding HTML for each card
    // = cities.map(city => { ... }) → تنفيذ الدالة على كل عنصر / map over cities
    const cards = cities.map(city => {
      return `
        <article class="card"> <!-- بطاقة / card -->
          <img src="${city.image}" alt="${city.name}" class="w-full h-56 object-cover" />
          <section class="p-4">
            <h3 class="text-xl font-semibold text-blue-800 mb-2">${city.name}</h3>
            <p class="text-gray-800">${city.description}</p>
          </section>
        </article>
      `; // HTML string لكل مدينة / HTML string for each city
    });

    // container.innerHTML → وضع الكود داخل الحاوية / insert HTML into container
    // cards.join("") → تحويل المصفوفة إلى نص واحد بدون فواصل / join array into a single string
    container.innerHTML = cards.join(""); // عرض كل البطاقات / display all cards
  } catch (error) { // catch(error) → التقاط الأخطاء أثناء التنفيذ / catch block for errors

    // في حالة حدوث خطأ قم بعرض الفقرة التالية / if an error occurs, display this paragraph
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

// async function loadWeatherAndTime() → تعريف دالة لتحميل الطقس والوقت / define function to load weather and time
async function loadWeatherAndTime() {
  try { // فتح try لمراقبة الأخطاء / start try block

    const apiKey = "75905d7e7eca947c6b7b3725f1bb68f0"; // مفتاح API للوصول لبيانات الطقس / API key for weather data

    const lat = 36.8; // lat → خط العرض / latitude
    const lon = 10.18; // lon → خط الطول / longitude

    // weatherResponse → رد جلب API الطقس / response from weather API
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    ); // جلب بيانات الطقس / fetch weather data

    // تحويل الرد إلى JSON / convert response to JSON
    const weatherData = await weatherResponse.json();

    // temp → درجة الحرارة، Math.round → تقريب إلى أقرب عدد صحيح / round temperature
    const temp = Math.round(weatherData.main.temp);

    // description → وصف حالة الطقس الحالي / weather description
    const description = weatherData.weather[0].description;

    // iconCode → رمز الأيقونة للطقس / weather icon code
    const iconCode = weatherData.weather[0].icon;

    // iconUrl → رابط مباشر للصورة عبر الأيقونة / direct URL for icon image
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // تحديث عناصر الطقس في الصفحة / update weather elements on page
    document.getElementById("weatherIcon").src = iconUrl;
    document.getElementById("weatherIcon").alt = description;
    document.getElementById("weatherDesc").textContent = description;
    document.getElementById("temperature").textContent = `${temp}°C`;

    function updateTime() { // updateTime → دالة داخلية لتحديث الوقت كل ثانية / function to update time every second
      const now = new Date(); // now → الوقت الحالي / current time
      // utc → تحويل الوقت المحلي إلى UTC / convert local time to UTC
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      // tunisiaTime → ضبط وقت تونس بإضافة ساعة واحدة (UTC+1) / adjust to Tunisia time
      const tunisiaTime = new Date(utc + 3600000);

      // hours, minutes, seconds → استخراج القيم / extract time parts
      const hours = tunisiaTime.getHours().toString().padStart(2, '0');
      const minutes = tunisiaTime.getMinutes().toString().padStart(2, '0');
      const seconds = tunisiaTime.getSeconds().toString().padStart(2, '0');

      // formattedTime → تنسيق بنمط "HH:MM:SS" / format time string
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      document.getElementById("time").textContent = formattedTime; // عرض الوقت / display time
    }

    updateTime(); // أول تشغيل / initial call
    setInterval(updateTime, 1000); // تحديث كل ثانية / update every second
  } catch (error) { // catch block للأخطاء / error handling block
    console.error("Error loading weather or time:", error); // طباعة الخطأ في الكونسول / log error
    document.getElementById("weatherTime").textContent = "Unable to load weather/time"; // رسالة فشل العرض / display failure message
  }
}

// استدعاء الدوال عند تحميل الصفحة / invoke functions on page load
loadCities(); // تحميل المدن / load cities
loadWeatherAndTime(); // تحميل الطقس والوقت / load weather and time