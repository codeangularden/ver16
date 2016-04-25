<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StudentRegistrationDetails.aspx.cs" Inherits="StudentRegistrationApp16.Views.StudentRegistrationDetails" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Student Registation Details</title>
	<link rel="stylesheet" href="/Styles/dashboard.css" />
	<script src="../Scripts/angular.js" type="text/javascript"></script>
	<script src="../Scripts/angular-route.js" type="text/javascript"></script>
	<link href="../Styles/bootstrap.min.css" rel="stylesheet" type="text/css" />
	<script src="../Scripts/angular-messages.js" type="text/javascript"></script>
	<script src="../JSON/Country.js" type="text/javascript"></script>
	<script src="../JSON/Master.js" type="text/javascript"></script>
	<script type="text/javascript">
		var app = angular.module('myApp', []);

		////		app.factory('studentregFactory', function ($http)
		////		{
		////			var service = {};


		////		});



		app.controller('studCtrl', function ($scope, $http)
		{
			$scope.countryList = countryList;
			$scope.gender = GenderMaster;
			$scope.hobbyList = HobbyList;

			$scope.newStudent = function ()
			{
				$scope.student = {};
			};

			$scope.newData = function ()
			{
				//				if ($routeParams.sid == null)
				//				{
				$scope.pageName = "Add Student";
				$scope.btnName = "Save";
				$scope.student = {};
				//				}
				//				else
				//				{
				//					$scope.pageName = "Update Student";
				//					$scope.btnName = "Update";

				//				}
			};

			$scope.saveStudent = function (student)
			{
				debugger;
				var OnSuccessSave = function (Res)
				{
					alert('Return from success');
					debugger;
				};
				var OnError = function ()
				{
					alert('Fail');
				};
				if (student._id == null)
				{
					$http({
						url: "http://localhost:34184/Views/StudentRegistrationDetails.aspx/saveStudent",
						method: "POST",
						data: { StudentObj: angular.toJson(student) }
					}).then(OnSuccessSave, OnError);
				}
				else
				{
					$http({
						url: "http://localhost:34184/Views/StudentRegistrationDetails.aspx/updateStudent",
						method: "POST",
						data: { StudentObj: angular.toJson(student) }
					}).then(OnSuccessSave, OnError);
				}
				$scope.listStudents();
			};

			$scope.listStudents = function ()
			{

				var OnSuccessList = function (Res)
				{
					alert('Return from List success ');
					$scope.List = angular.fromJson(Res.data.d);
				};
				var OnErrorList = function ()
				{
					alert('List Fail');
				};

				return $http({
					url: "http://localhost:34184/Views/StudentRegistrationDetails.aspx/getAllStudents",
					method: "GET",
					data: {},
					headers: { 'Content-Type': 'application/json' }
				}).then(OnSuccessList, OnErrorList);
				$scope.student = {};
			};

			$scope.editStudent = function (StudentID)
			{
				alert(StudentID);

				var OnSuccessEdit = function (Res)
				{
					alert('Return from success');
					debugger;
					var v = Res.data.d;
					$scope.student = angular.fromJson(Res.data.d)[0];
					$scope.student.DOB = new Date($scope.student.DOB);
				};
				var OnErrorEdit = function ()
				{
					alert('Fail');
				};

				$http({
					url: "http://localhost:34184/Views/StudentRegistrationDetails.aspx/findStudentById",
					method: "POST",
					data: { sid: StudentID }
				}).then(OnSuccessEdit, OnErrorEdit);
				$scope.listStudents();
			};

			$scope.deleteStudent = function (StudentID)
			{
				alert(StudentID);
				var OnSuccessDelete = function (Res)
				{
					alert('Return from success Delete');
					debugger;
					var v = Res.data.d;
					$scope.student = angular.fromJson(Res.data.d)[0];
				};
				var OnErrorDelete = function ()
				{
					alert('Fail Delete');
				};

				$http({
					url: "http://localhost:34184/Views/StudentRegistrationDetails.aspx/deleteStudent",
					method: "POST",
					data: { sid: StudentID }
				}).then(OnSuccessDelete, OnErrorDelete);
				$scope.listStudents();
			};


			$scope.saveStudentToLocal = function (student)
			{

				var localStudentList = [];
				var Key = "localStudent";

				if (localStorage.getItem("localStudent") != null)
				{
					localStudentList = JSON.parse(localStorage.getItem("localStudent"));
				}

				localStudentList.push(student);

				localStorage.setItem(Key, JSON.stringify(localStudentList));

			};

			$scope.saveLocalStorageToDatabase = function ()
			{
				debugger;
				var OnSuccessSaveToDB = function (Res)
				{
					localStorage.removeItem("localStudent");
					alert('Success DB Save');
					debugger;
				};
				var OnErrorSaveToDB = function ()
				{
//					localStorage.removeItem("localStudent");
					alert('Failed DB Save');
				};



				$http({
					url: "http://localhost:34184/Views/StudentRegistrationDetails.aspx/saveLocalToDatabase",
					method: "POST",
					data: { StudentObj: angular.toJson(JSON.parse(localStorage.getItem("localStudent"))) }
				}).then(OnSuccessSaveToDB, OnErrorSaveToDB);

			};

		});
		
	</script>
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">Student Registration Form</a>
			</div>
		</div>
	</nav>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-2 sidebar">
				<ul class="nav nav-sidebar">
					<li class="active"><a href="#">Menu <span class="sr-only">(current)</span></a></li>
					<li><a href="#Add">Add new Student</a> </li>
					<li><a href="#List">List Students</a> </li>
				</ul>
			</div>
			<div class="col-md-10 main">
				<div ng-view="" ng-app="myApp" ng-controller="studCtrl">
					<form name="exampleForm" class="form-horizontal" role="form" ng-submit="saveStudent();" novalidate>
					<div class="page-header">
						<h1>
							{{PageName}}</h1>
					</div>
					<div class="form-group">
						<div class="control-label  col-md-2">
							<b>First Name :</b></div>
						<div class="col-md-3">
							<input type="text" name="fname" class="form-control" placeholder="Enter First Name" ng-model="student.fname" required>
						</div>
						<%--<div class="form-group" ng-messages="exampleForm.fname.$error" ng-show="exampleForm.fname.$touched && exampleForm.fname.$invalid">
							<p ng-message="required">
								This field is required
							</p>
						</div>--%>
					</div>
					<div class="form-group">
						<div class="control-label  col-md-2">
							<b>DOB :</b></div>
						<div class="col-md-3">
							<input type="date" name="DOB" class="form-control" ng-model="student.DOB" required>
						</div>
					</div>
					<div class="form-group">
						<div class="control-label  col-md-2">
							<b>Gender :</b></div>
						<div class="col-md-3 radio radio-inline" ng-repeat="g in gender">
							<input type="radio" name="Gener" ng-model="student.gender" ng-value="g" required> {{g.Text}}</input>
						</div>
					</div>
					<div class="form-group">
						<div class="control-label col-md-2">
							<b>Country :</b></div>
						<div class="col-md-3">
							<select name="ddlCountry" class="form-control" ng-model="student.address.country" ng-options="country as country.Country_Description for country in countryList track by country.pk_Country_ID" required>
								<option value="">-----selected-----</option>
							</select>
						</div>
						<%--<div class="form-group" ng-messages="exampleForm.ddlCountry.$error" ng-show="exampleForm.ddlCountry.$touched && exampleForm.ddlCountry.$invalid">
							<p ng-message="required">
								This field is required
							</p>
						</div>--%>
					</div>
					<div class="form-group">
						<div class="control-label col-md-2">
							<b>Hobbies :</b></div>
						<div class="col-md-8">
							<label class="checkbox-inline" ng-repeat="h in hobbyList">
								<input type="checkbox" checklist-model="student.hobbies" checklist-value="h">
								{{h.name}}
							</label>
						</div>
					</div>
					<br />
					<div class="form-group">
						<div style="height: 30px">
						</div>
						<div align="center">
							<button type="button" class="btn btn-info" ng-click="newStudent();" ng-disabled="!exampleForm.$valid">
								New</button>
							<button type="button" class="btn btn-success" ng-disabled="!exampleForm.$valid" ng-click="saveStudent(student);">
								Save {{btnName}}</button>
							<button type="button" class="btn btn-primary" ng-disabled="!exampleForm.$valid" ng-click="saveStudentToLocal(student);">
								Save To Local Storage</button></div>
					</div>
					<br />
					<br />
					<button type="button" class="btn btn-primary" ng-click="saveLocalStorageToDatabase();">
						Sync Local Storage To Database</button>
					<br />
					<br />
					<button type="button" class="btn btn-group" ng-click="listStudents();">
						List Students</button>
					<br />
					<br />
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<td>
									Student Name
								</td>
								<td>
									Country
								</td>
								<td>
									DOB
								</td>
								<td>
									Gender
								</td>
								<td>
									Edit
								</td>
								<td>
									Delete
								</td>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="student in List">
								<td>
									{{student.fname}}
								</td>
								<td>
									{{student.address.country.Country_Description}}
								</td>
								<td>
									{{student.DOB|date:'dd/MM/yyyy'}}
								</td>
								<td>
									{{student.gender.Text}}
								</td>
								<td>
									<a ng-click="editStudent(student._id.$oid)">Edit</a>
								</td>
								<td>
									<a ng-click="deleteStudent(student._id.$oid)">Delete</a>
								</td>
							</tr>
						</tbody>
					</table>
					<br />
					<br />
					<div>
						StudentName : {{student.fname}}</div>
					<br />
					<div>
						Selected Country : {{student.address.country}}</div>
					<br />
					{{student}}
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>





using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using DemoProject_Template_DU.DbUtilityDB;
using System.Web.Script.Services;
using MongoDB.Bson;


namespace StudentRegistrationApp16.Views
{
	public partial class StudentRegistrationDetails : System.Web.UI.Page
	{
		static DbUtility oDAl = new DbUtility();
 		protected void Page_Load(object sender, EventArgs e)
		{

		}
		
		[WebMethod]
		public static bool saveStudent(string StudentObj)
		{
			return oDAl.SaveDocument(StudentObj, "Student");
		}

		[WebMethod]
		[ScriptMethod(UseHttpGet = true)]
		public static string getAllStudents()
		{
			return oDAl.GetAllDocumentsWithObjectId("Student");
		}

		[WebMethod]
		public static string findStudentById(string sid)
		{
			return oDAl.GetDocumentByIdWithObjectId("Student","_id",ObjectId.Parse(sid));
		}

		[WebMethod]
		public static bool updateStudent(string StudentObj)
		{
			return oDAl.UpdateDocumentByObjectId(StudentObj, "Student");
		}

		[WebMethod]
		public static bool deleteStudent(string sid)
		{
			return oDAl.DeleteDocumentByObjectId("Student", ObjectId.Parse(sid));
		}

		[WebMethod]
		public static bool saveLocalToDatabase(string StudentObj)
		{
			return oDAl.SaveDocumentBsonArray(StudentObj, "Student");
		}
	}
}