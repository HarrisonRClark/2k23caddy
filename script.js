$(document).ready(function() {
    function calculateYardage() {
        let distanceToFlag = parseFloat($('#distanceToFlag').val()) || 0;
        let elevation = parseFloat($('#elevation').val()) || 0;
        let wind = parseFloat($('#wind').val()) || 0;
        let liePercentage = parseFloat($('#liePercentage').val()) || 100;
        let windDirection = $('#windDirection').is(':checked');
        let club = $('#club').val();
        let greenCondition = $('#greenCondition').val();

        // Adjust wind based on direction
        wind = windDirection ? wind : -wind;

        // Calculate subtotal yardage
        let subtotalYardage = (((distanceToFlag) + (elevation / 3)) + wind) * (100 / liePercentage);
        $('#subtotalYardage').text(subtotalYardage.toFixed(2));

        // Determine rollout based on club and green condition
        let rollout = 0;
        switch (club) {
            case 'driver':
                rollout = subtotalYardage * 0.2; // 20% rollout for driver
                break;
            case 'wood':
                rollout = subtotalYardage * 0.08; // 15% rollout for wood
                break;
            case 'iron':
                rollout = subtotalYardage * 0.05; // 10% rollout for iron
                break;
            case 'wedge':
                rollout = subtotalYardage * 0; // 5% rollout for wedge
                break;
        }

        switch (greenCondition) {
            case 'firm':
                rollout *= 1.2; // Increase rollout by 20% for firm greens
                break;
            case 'medium':
                // No change for medium greens
                break;
            case 'soft':
                rollout *= 0.8; // Decrease rollout by 20% for soft greens
                break;
        }

        let totalDistance = subtotalYardage - rollout;

        $('#calculatedYardage').text(totalDistance.toFixed(2));
    }

    $('input, select').on('input change', calculateYardage);
});
