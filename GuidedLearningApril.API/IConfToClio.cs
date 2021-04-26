using Terrasoft.Core;

namespace GuidedLearningApril.API
{
	public interface IConfToClio
	{
		void logInfo(string message);
		void logWarn(string message);
		void logError(string message);
		void PostMessage(UserConnection userConnection, string senderName, string messageText);
	}
}
