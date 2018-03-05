
  document.getElementById('loan-form').addEventListener('submit', function(e){

    document.getElementById('results').style.display = 'none';

    
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
  });


  function calculateResults() {
    console.log('Calculating');
    // UI Vars
    const amount =  document.getElementById('amount');
    const interest =  document.getElementById('interest');
    const years =  document.getElementById('years');
    const monthlyPayment =  document.getElementById('monthly-payment');
    const totalPayment =  document.getElementById('total-payment');
    const totalInterest =  document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calcaulatedInterest = parseFloat(interest.value) / 100 / 12;
    const calcaulatedPayments = parseFloat(years.value) * 12;

    // Compute the monthly payment
    const x = Math.pow(1 + calcaulatedInterest, calcaulatedPayments);
    const monthly = (principal * x * calcaulatedInterest) / (x-1);

    if(isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calcaulatedPayments).toFixed(2);
      totalInterest.value = ((monthly * calcaulatedPayments) - principal).toFixed(2);
        // Showing results
        document.getElementById('results').style.display = 'block';

        // Hide loader
          document.getElementById('loading').style.display = 'none';
    } else {
      showError('Please check your numbers');
    }

  }

  //Show Error
  function showError(error) {
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Hide loader
      document.getElementById('loading').style.display = 'none';
    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
  }

  // Clear error
  function clearError() {
    document.querySelector('.alert').remove();
  }
