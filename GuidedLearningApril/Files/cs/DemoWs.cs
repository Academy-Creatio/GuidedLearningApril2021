using GuidedLearningApril.API;
using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Terrasoft.Core;
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
	}
}



