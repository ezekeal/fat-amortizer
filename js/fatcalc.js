/*global moment:true */

$(document).ready(function(){
  //hide everything
  $('#female-images').hide();
  $('#male-images').hide();
  $('input[name=deficit]').hide();
  $('#body-fat-input').hide();

  //set gender and show body fat images accordingly
  var gender;
  $('[value=male]').click(function(){
    $('#body-fat-input').show();
    $('#female-images').hide();
    $('#male-images').show();
    gender = 'male';
  });

  $('[value=female]').click(function(){
    $('#body-fat-input').show();
    $('#male-images').hide();
    $('#female-images').show();
    gender = 'female';
  });

  $('#body-fat-images img').click(function() {
    // Set the form value
    $('[name=body-fat]').val($(this).attr('data-value'));

    // Unhighlight all the images
    $('#body-fat-images img').removeClass('highlighted');

    // Highlight the newly selected image
    $(this).addClass('highlighted');
  });

  $('#deficit div').click(function() {
    // Set the form value
    $('[name=deficit]').val($(this).attr('data-value'));

    // Unhighlight all the images
    $('#deficit div').removeClass('box-highlighted');

    // Highlight the newly selected image
    $(this).addClass('box-highlighted');

    if ($(this).attr('data-value') === 'custom') {
      $('[name=deficit]').val(500);
      $('input[name=deficit]').show();
    }
      else {
        $('input[name=deficit]').hide();
      }
  });

  $('#calculate').click(function(){

    var weight = $('input[name=weight]').val();
    var bodyFat = $('input[name=body-fat]').val();
    var goalFat = Math.floor(bodyFat);
    var finalFat = 3;
    if ($('[name=sex]:checked').val() === 'female') {finalFat = 11;}
    var deficit = $('input[name=deficit]').val();
    var leanMass = Math.round(((100-bodyFat)/100 * weight)*1000)/1000;
    var fatMass = Math.round((weight - leanMass)*1000)/1000;
    var lbsPerDay = Math.round((deficit/3500)*1000)/1000;

    $('#result').html(
      '<hr><p>Under this plan you will lose ' + lbsPerDay + ' lbs per day</p>' +
      '<p>Your lean body mass is ' + leanMass + ' lbs and your fat mass is ' + fatMass + ' lbs</p>' +
      '<p>Here are the dates when you are expected to hit each body fat interval.</p><hr>');
    
    for (var i=goalFat; i>=finalFat; i--) {
      var weightToLose = (fatMass - (i/100)*weight);
      var daysToLose = Math.ceil(weightToLose / lbsPerDay);
      //report every percentage
      /*
      if (bodyFat > i) {
        $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY"));
      }*/
      if (gender === 'male') {
        switch (i) {
          case goalFat:
            break;
          case 32:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/men/6.png"></div>');
            break;
          case 22:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/men/5.png"></div>');
            break;
          case 15:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/men/4.png"></div>');
            break;
          case 10:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/men/3.png"></div>');
            break;
          case 7:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/men/2.png"></div>');
            break;
          case 4:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/men/1.png"></div>');
            break;
        }
      }
      else if (gender === 'female') {
        switch (i) {
          case goalFat:
            break;
          case 35:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/women/6.png"></div>');
            break;
          case 26:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/women/5.png"></div>');
            break;
          case 21:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/women/4.png"></div>');
            break;
          case 18:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/women/3.png"></div>');
            break;
          case 15:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/women/2.png"></div>');
            break;
          case 12:
            $('#result').append('<div><p>You will reach ' + i + '% on ' + moment().add('days', daysToLose).format("MMMM Do YYYY") + '</p><img src="images/women/1.png"></div>');
            break;
        }
      }
      $('#calendar').show();
    }
  });

});