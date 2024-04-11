#include "pch.h"
#include "CppUnitTest.h"
#include "samplesmoothing.h"
#include "samplesmoothing.cpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;

namespace SampleSmoothingTests
{
  TEST_CLASS(SampleSmoothingTests)
  {
  public:

    TEST_METHOD(SmoothingFactorUnder0ShouldStayAtZero)
    {
      // Arrange
      SampleSmoothing smoothing(-10.0f);

      // Act
      smoothing.AddSample(5); // 5 @ 100% = 5
      smoothing.AddSample(100); // 100 @ 0% = 0

      // Assert
      Assert::AreEqual(5.0f, smoothing.GetSmoothValue());
    }

    TEST_METHOD(SmoothingFactorOver1ShouldStayAt1)
    {
      // Arrange
      SampleSmoothing smoothing(10.0f);

      // Act
      smoothing.AddSample(5); // 5 @ 0% = 0
      smoothing.AddSample(100); // 100 @ 100% = 100

      // Assert
      Assert::AreEqual(100.0f, smoothing.GetSmoothValue());
    }

    TEST_METHOD(AddingOneSampleKeepSample)
    {
      // Arrange
      SampleSmoothing smoothing(0.5f);

      // Act
      smoothing.AddSample(10);

      // Assert
      Assert::AreEqual(10.0f, smoothing.GetSmoothValue());
    }

    TEST_METHOD(AddingTwoSamplesSmoothSecond)
    {
      // Arrange
      SampleSmoothing smoothing(0.5f);

      // Act
      smoothing.AddSample(10); // 10 @ 50% = 5
      smoothing.AddSample(20); // 20 @ 50% = 10

      // Assert
      Assert::AreEqual(15.0f, smoothing.GetSmoothValue());
    }

    TEST_METHOD(Adding10SamplesSmoothBasedOnSmoothFactor)
    {
      // Arrange
      SampleSmoothing smoothing(0.1f); // keep 10% of the new samples

      // Act
      smoothing.AddSample(10); //  10  @ 100%                             = 10
      smoothing.AddSample(20); //  20  @ 10% + 10     @ 90% = 2 + 9       = 11
      smoothing.AddSample(30); //  30  @ 10% + 11     @ 90% = 3 + 9.9     = 12.9
      smoothing.AddSample(40); //  40  @ 10% + 12.9   @ 90% = 4 + 11.61   = 15.61
      smoothing.AddSample(50); //  50  @ 10% + 15.61  @ 90% = 5 + 14.049  = 19.049
      smoothing.AddSample(60); //  60  @ 10% + 19.049 @ 90% = 6 + 17.1441 = 23.1441

      // Assert
      Assert::AreEqual(23.1441f, smoothing.GetSmoothValue());
    }
  };
}
