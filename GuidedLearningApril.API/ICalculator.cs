namespace GuidedLearningApril.API
{
	public interface ICalculator
	{
		decimal Add(decimal a, decimal b);
		string Devide(decimal a, decimal b);
		decimal Multiply(decimal a, decimal b);
		decimal Subtract(decimal a, decimal b);
	}
}