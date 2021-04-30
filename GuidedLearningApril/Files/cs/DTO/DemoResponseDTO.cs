using System;
using System.Runtime.Serialization;

namespace GuidedLearningApril
{

	[DataContract]
	public class DemoResponseDTO
	{
		[DataMember(Name ="date")]
		public DateTime RandomDate { get; set; }

		[DataMember(Name = "string")]
		public string SomeString { get; set; }

		[DataMember(Name = "number")]
		public int SomeNumber { get; set; }
	}
}
