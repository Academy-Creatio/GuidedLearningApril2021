using Common.Logging;
using GuidedLearningApril.API;
using Terrasoft.Configuration;
using Terrasoft.Core;
using Terrasoft.Core.Factories;

namespace GuidedLearningApril
{
	[DefaultBinding(typeof(IConfToClio))]
	public class ConfToClio : IConfToClio
	{
		public void logInfo(string message)
		{
			var logger = LogManager.GetLogger("GuidedLearningLogger");
			logger.Info(message);
		}

		public void logWarn(string message)
		{
			var logger = LogManager.GetLogger("GuidedLearningLogger");
			logger.Warn(message);
		}

		public void logError(string message)
		{
			var logger = LogManager.GetLogger("GuidedLearningLogger");
			logger.Error(message);
		}

		public void PostMessage(UserConnection userConnection, string senderName, string messageText)
		{
			MsgChannelUtilities.PostMessage(userConnection, senderName, messageText);
		}
	}
}