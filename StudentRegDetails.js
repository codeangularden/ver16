app.controller('studCtrl', function ($scope, studentregFactory, $routeParams, $rootScope) {


    //assign all hobbies
    $scope.hobbyList = [{ "name": "drawing" }, { "name": "singing" }, { "name": "painting"}];

    $scope.countryList = countryList;
    $scope.stateList = stateList;
    $scope.districtList = districtList;


    $scope.saveStudent = function () {
        console.log('rpara' + $routeParams.sid);

        if ($routeParams.sid == null) {
            studentregFactory.saveStudent($scope.stud).success(function (data) {
                if (data.d == true) {
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student data saved successfully";
                }
                else {
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student data not saved,Please contact admin";
                }
                $scope.success = true;
                //localStorage.setItem('studentsinls', $scope.studentinDb);
                window.location = "http://localhost:32566/Views/StudentRegistration.aspx#/List";
            });
        }

        else {

            studentregFactory.editStudent($scope.stud).success(function (data) {
                if (data.d == true) {
                    console.log(data.d);
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student updated Successfully";
                }
                else {
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student data not saved,Please contact admin";
                }
                $scope.success = true;
                window.location = "http://localhost:32566/Views/StudentRegistration.aspx#/List";
            });
        }
    };

    $scope.saveStudentToLocal = function (stud) {
        debugger;
        var myLocalList = []; //load existing array at init        
        var key = 'myLocal';

        if (localStorage.getItem("myLocal") != null) {
            myLocalList = JSON.parse(localStorage.getItem("myLocal"));
        }
        myLocalList.push(stud);
        localStorage.setItem(key, JSON.stringify(myLocalList));
        //$scope.getCountFromLocal();
        window.location = "http://localhost:32566/Views/StudentRegistration.aspx#/List";

    };




    $scope.newStudent = function () {
        $scope.stud = {};
    };

    $scope.newData = function () {
        if ($routeParams.sid == null) {
            $scope.PageName = "Add Student";
            $scope.btnName = "Save";
            $scope.stud = {};
        }
        else {
            $scope.PageName = "Update Student";
            $scope.btnName = "Update";

            studentregFactory.findStudentByID($routeParams.sid).success(function (data) {
                //                debugger;
                var std = JSON.parse(data.d);
                $scope.stud = std[0];
                $scope.stud.bday = new Date(std[0].bday);
            });
        }
        $rootScope.showMessage = false;
    };
    $scope.newData();


});