// Initialize tooltips for all elements with data-toggle="tooltip"
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover' // Change trigger to 'hover' for error tooltips
    });
});

// Function to handle form submission and tax calculation
function submitForm() {
    // Reset previous error states
    hideAllErrors();

    // Get input values
    var grossIncome = parseFloat($('#grossIncome').val());
    var extraIncome = parseFloat($('#extraIncome').val());
    var deductions = parseFloat($('#deductions').val());
    var age = $('#age').val();

    // Validate inputs
    var isValid = true;

    // Validate gross income
    if (isNaN(grossIncome) || grossIncome < 0) {
        showError('grossIncomeError', 'Gross income is required or invalid');
        isValid = false;
    }

    // Validate extra income
    if (isNaN(extraIncome) || extraIncome < 0) {
        showError('extraIncomeError', 'Extra income is required or invalid');
        isValid = false;
    }

    // Validate deductions
    if (isNaN(deductions) || deductions < 0) {
        showError('deductionsError', 'Deductions are required or invalid');
        isValid = false;
    }

    // Validate age group selection
    if (age === '') {
        showError('ageError', 'Age group is required');
        isValid = false;
    }

    // If input is valid, proceed with tax calculation
    if (isValid) {
        var taxRate;

        // Determine tax rate based on age group
        switch (age) {
            case 'below40':
                taxRate = 0.3; // 30%
                break;
            case '40to60':
                taxRate = 0.4; // 40%
                break;
            case 'above60':
                taxRate = 0.1; // 10%
                break;
            default:
                // Default tax rate in case of invalid age group
                taxRate = 0;
        }

        // Calculate overall income
        var overallIncome = grossIncome + extraIncome - deductions;

        // Calculate taxable income if overall income is greater than 8 lakhs
        var taxableIncome = Math.max(0, overallIncome - 800000);

        // Calculate tax amount based on taxable income and tax rate
        var taxAmount = taxRate * taxableIncome;

        // Calculate net income after tax deduction
        var netIncome = overallIncome - taxAmount;

        // Display result in modal
        $('#resultBody').html('<h2>Your overall income will be</h2><h4>' + netIncome.toFixed(2) + ' Lakhs</h4><h6>after tax deduction</h6>');
        $('#resultModal').modal('show');
    }
}

// Function to show error icon and tooltip
function showError(elementId, errorMessage) {
    $('#' + elementId).css('display', 'inline').attr('title', errorMessage);
}

// Function to hide all error icons
function hideAllErrors() {
    $('.error-icon').css('display', 'none');
}
