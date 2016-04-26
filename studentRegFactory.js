app.factory('studentregFactory', function ($http) {

    var service = {}

    service.saveStudent = function (stud) {

        return $http({
            url: "StudentRegistration.aspx/saveStudent",
            method: "POST",
            data: { StudentObj: angular.toJson(stud) }
        })
    };


    service.getAllStudnets = function () {
        return $http({
            url: "StudentRegistration.aspx/getAllStudent",
            method: "GET",
            data: {},
            headers: { "Content-Type": "application/json" }
        })
    };

    service.deleteStudent = function (id) {
        return $http({
            url: "StudentRegistration.aspx/delete",
            method: "POST",
            data: { sid: id }
        })
    };

    service.editStudent = function (student) {
        console.log('testfac'+student);
        return $http({
            url: "StudentRegistration.aspx/editStudent",
            method: "POST",
            data: { StudentObj: angular.toJson(student) }
        })
    };

    service.findStudentByID = function (sid) {
        return $http({
            url: "StudentRegistration.aspx/findStudentByID",
            method: "POST",
            data: { sid: sid }
        })
    };


    service.saveStudentToCloud = function (stud) {
        debugger;
        return $http({
            url: "StudentRegistration.aspx/saveStudentToCloud",
            method: "POST",
            data: { StudentObj: angular.toJson(stud) }
        })
    };



    return service;

});