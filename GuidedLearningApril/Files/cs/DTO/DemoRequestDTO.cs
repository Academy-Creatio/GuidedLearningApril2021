using System.Runtime.Serialization;

namespace GuidedLearningApril
{
	[DataContract]
	public class DemoRequestDTO
	{
		[DataMember(Name="name")]
		public string Name { get; set; }

		[DataMember(Name = "birthday")]
		public string Birthday { get; set; }

		[DataMember(Name = "age")]
		public int Age { get; set; }

	}
}
