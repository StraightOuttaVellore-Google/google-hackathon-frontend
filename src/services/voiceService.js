/**
 * Voice Service for handling WebSocket communication with the backend
 */

import { logger } from './loggingService';
import { getWebSocketUrl } from '../config/apiConfig';

export class VoiceService {
  constructor(onMessage, onStatusChange, onError) {
    this.clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.onMessage = onMessage;
    this.onStatusChange = onStatusChange;
    this.onError = onError;
    this.ws = null;
  }

  async connect(config) {
    return new Promise((resolve, reject) => {
      try {
        // Get backend URL from centralized config
        const wsUrl = getWebSocketUrl(`/ws/${this.clientId}`);
        
        logger.info('Starting connection process', { wsUrl, clientId: this.clientId, config }, 'VoiceService');
        
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          logger.info('WebSocket connected successfully', { clientId: this.clientId, readyState: this.ws.readyState }, 'VoiceService');
          logger.info('Sending configuration', {}, 'VoiceService');
          this.send({
            type: 'config',
            config: config
          });
          logger.info('Configuration sent, resolving promise', {}, 'VoiceService');
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            logger.debug('Message received', { type: message.type, status: message.status }, 'VoiceService');
            this.onMessage(message);
            
            if (message.type === 'status') {
              logger.debug('Status change', { status: message.status }, 'VoiceService');
              this.onStatusChange(message.status || 'idle');
            }
          } catch (error) {
            logger.error('Error parsing WebSocket message', { error, data: event.data }, 'VoiceService');
            this.onError('Failed to parse server message');
          }
        };

        this.ws.onclose = (event) => {
          logger.info('WebSocket closed', { code: event.code, reason: event.reason }, 'VoiceService');
          this.onStatusChange('disconnected');
        };

        this.ws.onerror = (error) => {
          logger.error('WebSocket error', { error, readyState: this.ws?.readyState, url: wsUrl }, 'VoiceService');
          this.onError('Connection error');
          reject(error);
        };

      } catch (error) {
        reject(error);
      }
    });
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      logger.debug('Sending message', { type: message.type }, 'VoiceService');
      this.ws.send(JSON.stringify(message));
    } else {
      logger.warn('WebSocket not connected, cannot send message', { type: message.type, readyState: this.ws?.readyState }, 'VoiceService');
    }
  }

  sendAudio(audioData, sampleRate = 16000) {
    logger.debug('Sending audio data', { dataLength: audioData.length, sampleRate }, 'VoiceService');
    this.send({
      type: 'audio',
      data: audioData,
      sampleRate: sampleRate
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected() {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}
