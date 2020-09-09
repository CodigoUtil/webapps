var app = angular.module('appQuiz',[]);
app.controller('appQuizCller',function($scope,$http){
    var quizArray=[];
    var index=0;
    var aciertos=0;
    $scope.irSiguiente=function(){
        index +=1;
        if (index>$scope.total){
            $scope.verResult=true;
            $scope.verPreg=false;
            $scope.aciertos=aciertos;
            return;
        }
        asignarValores(quizArray);
        $scope.verMensaje=false;
    }
    $scope.valorSel=function(value){
      $scope.mensaje='Incorrecto! dar click para ir a la siguiente pregunta';
      $scope.mensajeColor={color:"red"}
       if (value== $scope.answer){
        $scope.mensaje="Correcto! dar click para ir a la siguiente pregunta";
        $scope.mensajeColor={color:"green"}
        aciertos += 1;
       }
       $scope.verMensaje=true;
    }
    $http({
        //Nota importante siempre utilizar el que terminar en /exec para que no presente el error de cors
        url:'https://script.google.com/macros/s/AKfycbyCprFKumylCjvfEU7YEVN3Vzpcwjs2lQE0AOVxArxlx4Jw_a-X/exec',
        method:'Get'
    }).then(function(response){
       quizArray=response.data.data;
       asignarValores(quizArray)
    })
    //Nota : Las asignaciones siempre se hacen por funciones 
    function asignarValores(quizA){
        console.log(quizA);
        $scope.question=quizA[index].question;
        $scope.answer=quizA[index].answer;
        $scope.lista=quizA[index].opt;
        $scope.total = quizA.length;
        $scope.nroPreg=index + 1;
        $scope.mensaje="";
        $scope.verMensaje=false;
        $scope.verResult=false;
        $scope.verPreg=true;
        //$scope.aciertos=0;
    }

})