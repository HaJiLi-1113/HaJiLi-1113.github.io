(() => {
  dayjs.extend(window.dayjs_plugin_duration)
  const el = document.getElementById('realtime_duration')
  // 改成自己的时间
  const date = dayjs('2025-10-13')
  
  // 旅行者一号相关信息
  const voyagerLaunchDate = dayjs('1977-09-05') // 发射日期
  const voyagerSpeed = 17.06 // km/s
  
  setInterval(() => {
    // 原有的网站运行时间计算
    const dur = dayjs.duration(dayjs().diff(date))
    const days = String(Math.floor(dur.asDays()))
    
    // 计算旅行者一号距离地球的距离
    const voyagerDuration = dayjs.duration(dayjs().diff(voyagerLaunchDate))
    const voyagerDistanceKm = voyagerSpeed * voyagerDuration.as('seconds') // 千米
    const voyagerDistanceAU = voyagerDistanceKm / 149597870.7 // 天文单位 (1 AU = 149,597,870.7 km)
    
    // 格式化显示
el.innerHTML = '<span style="letter-spacing: 5px;">本站居然运行了' + days + dur.format('天HH时mm分ss秒') + '❤</span><br>' +
              '<span style="letter-spacing: 3px;">旅行者一号当前距离地球' + voyagerDistanceKm.toFixed(0) + '千米,约为' + 
              voyagerDistanceAU.toFixed(2) + '天文单位 🚀</span>'
  }, 1000)
})()