#ifndef samplesmoothing_h
#define samplesmoothing_h

class SampleSmoothing
{
  public:
    SampleSmoothing(float smoothingFactor);
    void AddSample(float value);
    float GetSmoothValue();
  private:
    float _currentSmoothValue;
    float _smoothingFactor;
    float _reverseSmoothingFactor;
    bool _firstSample;
    float Smooth(float value);
    float ClampSmoothingFactor(float value);
};
#endif
