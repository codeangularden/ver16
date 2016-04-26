
app.controller('listCtrl', function ($scope, studentregFactory, $rootScope) {

    //Find All Student Details
    $scope.getStudentData = function () {
        studentregFactory.getAllStudnets().success(function (data) {
            $scope.studentinDb = JSON.parse(data.d);
            //$scope.sortOrder = false;
            $scope.success = true;
        })
    };

    $scope.fnDelete = function (id) {
        studentregFactory.deleteStudent(id).success(function (data) {

            if (data.d == true) {
                $scope.showMessage = true;
                $scope.message = "Student data Deleted Successfully";
                $scope.getStudentData();
            }
            else {
                $scope.showMessage = true;
                $scope.message = "Student data not deleted Successfully";
            }
        })
    };

    $scope.sortOrder = false;
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = x;
        $scope.sortOrder = !$scope.sortOrder;
    };


    $scope.getStudentDataLocalStorage = function () {
        if (localStorage.getItem("myLocal") != null) {
            $scope.StudentListLocal = JSON.parse(localStorage.getItem("myLocal"));
        }

    };

    $scope.saveStudentFromLocalToCloud = function () {
        
        studentregFactory.saveStudentToCloud(JSON.parse(localStorage.getItem("myLocal"))).success(function (data) {
                if (data.d == true) {
                    localStorage.removeItem("myLocal");
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student data saved successfully to cloud";
                }
                else {
                    $rootScope.showMessage = true;
                    $rootScope.message = "Student data not saved,Please contact admin";
                }
                $scope.success = true;
    });
    
    
    };

    $scope.getStudentDataLocalStorage();
    $scope.getStudentData();

});