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

// تشغيل الدالة لتحميل المدن عند تحميل الصفحة
loadCities();