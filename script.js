const goalContainer = document.querySelectorAll('.goal-container')
  
  const allCheckBoxes = document.querySelectorAll('.checkbox')
  const allGoalInputs = document.querySelectorAll('.goal-input')
  const error = document.querySelector('.error-label')
  const progressBar = document.querySelector('.progress-bar')
  const progressValue = document.querySelector('.progress-value')
  const quote = document.querySelector('.quote')
  
  const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun half is done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'
  ]
  
  const goalsData = JSON.parse(localStorage.getItem('goalsInfo')) || {}
  
  let completedGoals = Object.values(goalsData).filter((goal) => goal.completed).length
  
  let totalGoals = document.querySelectorAll('.goal-container').length
  
  progressValue.style.width = `${completedGoals / totalGoals * 100}%`
  
  progressValue.children[0].innerText = `${completedGoals}/${totalGoals} completed`
  
  progressBar.previousElementSibling.innerText = allQuotes[completedGoals]
  
  if (completedGoals === 0) {
    quote.innerText = '"Move one step a head, today"'
  } else {
    quote.innerText = '“Keep Going, You’re making great progress!”'
  }
  
  allCheckBoxes.forEach((checkbox, i) => {
    goalContainer[i].addEventListener('click', () => {
      const allInputsFilled = [...allGoalInputs].every((goalInput) => goalInput.value)
      
      if (allInputsFilled) {
        checkbox.parentElement.classList.toggle('completed')
        error.classList.remove('error-label-active')
        
        if (goalsData[i]) {
          goalsData[i].completed = !goalsData[i].completed
        }
        
        localStorage.setItem('goalsInfo', JSON.stringify(goalsData))
        
        completedGoals = Object.values(goalsData).filter((goal) => goal.completed).length
        
        progressValue.style.width = `${completedGoals / totalGoals * 100}%`
        
        progressValue.children[0].innerText = `${completedGoals}/${totalGoals} completed`
        
        progressBar.previousElementSibling.innerText = allQuotes[completedGoals]
        
        if (completedGoals === 0) {
          quote.innerText = '"Move one step a head, today"'
        } else {
          quote.innerText = '“Keep Going, You’re making great progress!”'
        }
        
      } else {
        error.classList.add('error-label-active')
      }
      
    })
  })
  
  allGoalInputs.forEach((input, i) => {
    
    if (goalsData[i])
      
      input.value = goalsData[i].name
    
    if (goalsData[i] && goalsData[i].completed) {
      input.parentElement.classList.add('completed')
    }
    
    input.addEventListener('focus', () => {
      error.classList.remove('error-label-active')
    })
    
    input.addEventListener('input', () => {
      
      if (goalsData[i] && goalsData[i].completed) {
        input.value = goalsData[i].name
        return
      }
      
      goalsData[i] = {
        name: input.value,
        completed: false,
      }
      
      localStorage.setItem('goalsInfo', JSON.stringify(goalsData))
      
    })
  })