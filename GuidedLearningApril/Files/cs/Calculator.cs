using GuidedLearningApril.API;
using Terrasoft.Core.Factories;

namespace GuidedLearningApril
{
	[DefaultBinding(typeof(ICalculator), Name ="First")]
	public class Calculator : ICalculator
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
			return (a / b).ToString();
		}



	}
}
