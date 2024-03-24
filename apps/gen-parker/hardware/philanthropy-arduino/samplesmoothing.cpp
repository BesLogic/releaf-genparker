#include "samplesmoothing.h"

// Inspiration:
// EMA: https://en.wikipedia.org/wiki/Exponential_smoothing
// SMA: https://en.wikipedia.org/wiki/Moving_average
SampleSmoothing::SampleSmoothing(float smoothingFactor)
{
  _firstSample = true;
  _currentSmoothValue = 0;
  _smoothingFactor = ClampSmoothingFactor(smoothingFactor);
  _reverseSmoothingFactor = 1.0f - _smoothingFactor;
}

// Algo need smoothing factor to be between 0 and 1
float SampleSmoothing::ClampSmoothingFactor(float smoothingFactor)
{
  if (smoothingFactor < 0)
  {
    return 0;
  }
  else if (smoothingFactor > 1)
  {
    return 1;
  }

  return smoothingFactor;
}

void SampleSmoothing::AddSample(float value)
{
  if (_firstSample)
  {
    _currentSmoothValue = value;
    _firstSample = false;
  }
  else
  {
    _currentSmoothValue = Smooth(value);
  }
}

float SampleSmoothing::Smooth(float value)
{
  return _smoothingFactor * value + _reverseSmoothingFactor * _currentSmoothValue;
}

float SampleSmoothing::GetSmoothValue()
{
  return _currentSmoothValue;
}
