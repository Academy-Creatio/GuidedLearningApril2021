using GuidedLearningApril.API;
using Terrasoft.Core.Factories;

namespace GuidedLearningApril
{
	[DefaultBinding(typeof(ICalculator), Name = "Second")]
	public class AnotherCalculator : ICalculator
	{
		public decimal Add(decimal a, decimal b)
		{
			return a + b;
		}

		public decimal Subtract(decimal a, decimal b)
		{
			return a - b;
		}

		public decimal Multiply(decimal a, decimal b)
		{
			return a * b;
		}


		public string Devide(decimal a, decimal b)
		{
			if(b == 0)
			{
				return "Cannot divide by 0";
			}
			return (a / b).ToString();
		}
	}
}
