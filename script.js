$(document).ready(function()
{
    var marks=0;
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz",function(response)
    {
        console.log(response);
                for(var i=0;i<response.length;i++)
                {
                    
                    $('section > div:nth-of-type(1)').append($('<div>').attr('id',response[i].id));
                    $("#"+response[i].id).append($('<p>').text("Q" + (i+1) + "." + response[i].question));
                    var l;
                    for(var j=0;j<response[i].options.length;j++)
                    {
                        l=$('<label>');
                        $("#"+response[i].id).append($('<div>').append(
                                                                        $('<div>').append(l).css({'width':'80%'}),
                                                                        $('<div>').addClass('iconContainer').css({'width':'20%'})
                                                                        ).css({
                                                                             'display':'flex',
                                                                            'margin-top':'10px'
                                                                        })
                        );
                            l.append($('<input>').attr({'type':'radio',
                                                        'name':response[i].question,
                                                        'value':(j+1)}     
                                                        ),
                            $('<span>').text(response[i].options[j])
                        );  
                    }
                    // $('.correct').css({'color':'green',
                    //                     'margin-left':'10px'});
                    // $('.wrong').css({'color':'red',
                    //                     'margin-left':'10px'});
                    $("#"+response[i].id).css({"border-bottom":"2px solid #fad744",
                                                "border-radius":"2px",
                                                "padding":"10px",
                                                'padding-bottom':"20px"
                                                }
                    );
                }
                var btnWrap=$('<article>');
                var btn=$('<input>').attr({'type':'submit',
                                            'id':'buttonn'});
                $('section > div:nth-of-type(1)').append(btnWrap);
                btnWrap.append(btn);
                $(btn).click(function(e)
                {
                   
                    var marks=0;
                    for(var k=0;k<response.length;k++)
                    {   
                        for(m=0;m<response[k].options.length;m++)
                        {
                            var vvv=$("#" + (k+1) + ">" + "div:nth-of-type(" + (m+1) + ")" + " > div:nth-of-type(1) label input[type='radio']").is(':checked');
                            if(vvv==true)
                            {
                                if($("#" + (k+1) + ">" + "div:nth-of-type(" + (m+1) + ")" + " > div:nth-of-type(1) label input[type='radio']").val()==response[k].answer)
                                {
                                    ++marks;
                                    $("#" + (k+1) + ">" + "div:nth-of-type(" + (m+1) + ")" + " > div:nth-of-type(2)").append($('<i>').addClass('fas fa-check').addClass('correct'));
                                }
                                else
                                {
                                    $("#" + (k+1) + ">" + "div:nth-of-type(" + (m+1) + ")" + " > div:nth-of-type(2)").append($('<i>').addClass('fas fa-times').addClass('inCorrect'));
                                    $("#" + (k+1) + ">" + "div:nth-of-type(" + (response[k].answer) + ")" + " > div:nth-of-type(2)").append($('<i>').addClass('fas fa-check').addClass('correct'));   
                                }
                                $('.correct').css({'color':'lightgreen'});
                                $('.inCorrect').css({'color':'red'});
                            }
                        }
                    }
                    $('#insertMarks').text(marks);
                    for(var t1=0;t1<response.length;t1++)
                    {
                        for(var t2=0;t2<response[t1].options.length;t2++)
                        {
                            $("#" + (t1+1) + ">" + "div:nth-of-type(" + (t2+1) + ")" + " > div:nth-of-type(1) label input[type='radio']").attr('disabled',true);
                        }
                    }
                    btn.attr('disabled',true);
                });
                
    });
});
