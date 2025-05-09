const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp();

// Environment variables
const config = {
  app: {
    name: process.env.APP_NAME || '3D Tarot Reading',
    version: process.env.APP_VERSION || '1.0.0',
    env: process.env.APP_ENV || 'development'
  },
  api: {
    url: process.env.API_URL,
    key: process.env.API_KEY
  },
  features: {
    analytics: process.env.ENABLE_ANALYTICS === 'true',
    notifications: process.env.ENABLE_NOTIFICATIONS === 'true',
    history: process.env.ENABLE_HISTORY === 'true'
  },
  ui: {
    defaultLanguage: process.env.DEFAULT_LANGUAGE || 'vi',
    defaultTheme: process.env.DEFAULT_THEME || 'dark',
    animationSpeed: parseFloat(process.env.ANIMATION_SPEED) || 1.0
  },
  audio: {
    enabled: process.env.ENABLE_SOUND === 'true',
    defaultVolume: parseFloat(process.env.DEFAULT_VOLUME) || 0.7,
    soundEffects: process.env.SOUND_EFFECTS === 'true',
    backgroundMusic: process.env.BACKGROUND_MUSIC === 'true'
  },
  storage: {
    maxHistoryItems: parseInt(process.env.MAX_HISTORY_ITEMS) || 100,
    maxSavedReadings: parseInt(process.env.MAX_SAVED_READINGS) || 50,
    cacheDuration: parseInt(process.env.CACHE_DURATION) || 3600
  },
  security: {
    rateLimiting: process.env.ENABLE_RATE_LIMITING === 'true',
    maxRequestsPerMinute: parseInt(process.env.MAX_REQUESTS_PER_MINUTE) || 60,
    sessionTimeout: parseInt(process.env.SESSION_TIMEOUT) || 3600
  }
};

// Example HTTP function
exports.getConfig = functions.https.onRequest((request, response) => {
  response.json({
    app: config.app,
    features: config.features,
    ui: config.ui,
    audio: config.audio
  });
});

// Example function to save reading history
exports.saveReading = functions.https.onRequest(async (request, response) => {
  try {
    const { userId, reading } = request.body;
    
    if (!userId || !reading) {
      response.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const db = admin.firestore();
    const historyRef = db.collection('readings').doc(userId);
    
    await historyRef.set({
      readings: admin.firestore.FieldValue.arrayUnion(reading),
      updatedAt: admin.firestone.FieldValue.serverTimestamp()
    }, { merge: true });

    response.json({ success: true });
  } catch (error) {
    console.error('Error saving reading:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
}); 