import { useState } from 'react';
import { Send, Camera, Mic, MicOff, Smile, Meh, Frown } from 'lucide-react';
import { useAccessibility } from '../hooks/useAccessibility';

export function EnhancedFeedback() {
  const [feedback, setFeedback] = useState({
    rating: 0,
    message: '',
    screenshot: null as File | null,
    voiceNote: null as Blob | null
  });
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const { speakText } = useAccessibility();

  const handleRatingClick = (rating: number) => {
    setFeedback(prev => ({ ...prev, rating }));
    const ratingText = rating === 3 ? 'happy' : rating === 2 ? 'neutral' : 'sad';
    speakText(`You selected ${ratingText} rating`);
  };

  const handleScreenshot = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          setFeedback(prev => ({ ...prev, screenshot: file }));
          speakText('Screenshot uploaded');
        }
      };
      input.click();
    } catch (error) {
      console.error('Screenshot error:', error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setFeedback(prev => ({ ...prev, voiceNote: blob }));
        speakText('Voice note recorded');
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      speakText('Recording started');
    } catch (error) {
      console.error('Recording error:', error);
      speakText('Could not start recording');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      speakText('Recording stopped');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    speakText('Thank you for your feedback!');
    setFeedback({ rating: 0, message: '', screenshot: null, voiceNote: null });
  };

  const getRatingIcon = (rating: number) => {
    switch (rating) {
      case 3: return <Smile className="text-green-500" size={32} />;
      case 2: return <Meh className="text-yellow-500" size={32} />;
      case 1: return <Frown className="text-red-500" size={32} />;
      default: return <div className="w-8 h-8 border-2 border-gray-300 rounded-full" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Share Your Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating System */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              How was your experience?
            </label>
            <div className="flex justify-center gap-4">
              {[1, 2, 3].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(rating)}
                  className={`p-3 rounded-full transition-all ${
                    feedback.rating === rating
                      ? 'bg-primary-100 scale-110'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {getRatingIcon(rating)}
                </button>
              ))}
            </div>
          </div>

          {/* Text Feedback */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tell us more (optional)
            </label>
            <textarea
              id="message"
              value={feedback.message}
              onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Share your thoughts, suggestions, or report any issues..."
            />
          </div>

          {/* Media Attachments */}
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleScreenshot}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Camera size={18} />
              Upload Screenshot
            </button>

            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isRecording
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              {isRecording ? 'Stop Recording' : 'Voice Note'}
            </button>
          </div>

          {/* File Status */}
          {feedback.screenshot && (
            <p className="text-sm text-green-600 dark:text-green-400">
              ✓ Screenshot attached: {feedback.screenshot.name}
            </p>
          )}
          {feedback.voiceNote && (
            <p className="text-sm text-green-600 dark:text-green-400">
              ✓ Voice note recorded
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={feedback.rating === 0}
            className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Send Feedback
          </button>
        </form>
      </div>
    </div>
  );
}