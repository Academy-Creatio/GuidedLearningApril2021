using GuidedLearningApril.API;
using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using Terrasoft.Core.Factories;
using Terrasoft.Web.Common;

namespace GuidedLearningApril
{
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class DemoWs : BaseService
	{
		[OperationContract]
		[WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, 
			ResponseFormat = WebMessageFormat.Json)]
		public string TestMethod(decimal a, decimal b)
		{
			IConfToClio conf = ClassFactory.Get<IConfToClio>();
			conf.logInfo("Attempting to execute DemoWs TestMethod");
			string message = "This is my WebSocket message";
			conf.PostMessage(UserConnection, GetType().Name, message);



			//ICalculator calc = new Calculator();
			ICalculator calc = ClassFactory.Get<ICalculator>("First");
			return calc.Devide(a, b).ToString();
		}


		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
			ResponseFormat = WebMessageFormat.Json)]
		public DemoResponseDTO PostMethodName(DemoRequestDTO demoRequestDTO)
		{

			var result = new DemoResponseDTO
			{
				RandomDate = DateTime.Parse(demoRequestDTO.Birthday).AddDays(67),
				SomeNumber = demoRequestDTO.Age + 88,
				SomeString = demoRequestDTO.Name + " random text here"
			};


			return result;
			//return demoRequestDTO.Age + 10;
		}

		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
			ResponseFormat = WebMessageFormat.Json)]
		public string PostMethodName2(Guid Id)
		{
			Select select = new Select(UserConnection)
				.Column("Email")
				.From("Contact")
				.Where("Id").IsEqual(Column.Parameter(Id)) as Select;
			return select.ExecuteScalar<string>();
			

			
			//return demoRequestDTO.Age + 10;
		}
	}
}



