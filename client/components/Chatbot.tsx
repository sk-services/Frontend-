import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  MessageCircle,
  X,
  Send,
  User,
  Download,
  Phone,
  Home,
  Building2,
  Wrench,
  HelpCircle,
  Edit3,
  Instagram,
  RotateCcw,
  Minimize
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  isOption?: boolean;
  flowStateSnapshot?: FlowState;
}

interface ConversationData {
  serviceCategory: string;
  serviceType: string;
  businessType?: string;
  homeType?: string;
  area?: string;
  pincode: string;
  name: string;
  phone: string;
  selectedPackage?: string;
  customRequest?: string;
  timestamp: Date;
}

type FlowState =
  | 'main_menu'
  | 'residential_type'
  | 'residential_home'
  | 'commercial_type'
  | 'commercial_business'
  | 'commercial_area'
  | 'renovation_type'
  | 'renovation_project'
  | 'renovation_area'
  | 'pincode_input'
  | 'contact_name_input'
  | 'contact_phone_input'
  | 'contact_input'
  | 'package_selection'
  | 'package_details'
  | 'custom_request'
  | 'faqs'
  | 'completed'
  | 'post_completion_options';

const predefinedQAs = [
  {
    question: "What areas do you serve?",
    answer: "We serve Pune, PCMC, and surrounding areas with our premium cleaning and renovation services."
  },
  {
    question: "What are your pricing ranges?",
    answer: "Our packages are:\n• Basic: Dry floor cleaning + professional mopping (great for quick refreshes)\n• Premium: Furniture (outside), windows, lights/switchboards, wall dry clean\n• Luxury: Walls chemical wash, full furniture deep clean, appliances, floor scrubbing, post-inspection\n\nExact pricing depends on your specific requirements."
  },
  {
    question: "How quickly can you start?",
    answer: "We typically start within 24-48 hours. For urgent requirements, same-day service is available."
  },
  {
    question: "Do you provide renovation services?",
    answer: "Yes! We offer:\n• End-to-End Renovation\n• Furniture Upgradation\n• Painting Renovation\n• Custom renovation solutions"
  },
  {
    question: "Are your products eco-friendly?",
    answer: "Absolutely! We use only eco-friendly, non-toxic products that are safe for your family and the environment."
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [flowState, setFlowState] = useState<FlowState>('main_menu');
  const [conversationData, setConversationData] = useState<Partial<ConversationData>>({});
  const [allConversations, setAllConversations] = useState<ConversationData[]>([]);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  // Expose openChatbot function globally
  useEffect(() => {
    (window as any).openChatbot = () => {
      setIsOpen(true);
      setHasTriggered(true);
    };

    return () => {
      delete (window as any).openChatbot;
    };
  }, []);

  // Auto-trigger logic
  useEffect(() => {
    if (!hasTriggered && !isOpen) {
      let timeoutTimer: NodeJS.Timeout;
      let scrollHandler: () => void;

      // Page load trigger (5 seconds)
      timeoutTimer = setTimeout(() => {
        if (!hasTriggered && !isOpen) {
          triggerChatbot();
        }
      }, 5000);

      // Scroll depth trigger (>20%)
      scrollHandler = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 20 && !hasTriggered && !isOpen) {
          triggerChatbot();
        }
      };

      window.addEventListener('scroll', scrollHandler);

      return () => {
        clearTimeout(timeoutTimer);
        window.removeEventListener('scroll', scrollHandler);
      };
    }
  }, [hasTriggered, isOpen]);

  const triggerChatbot = () => {
    setHasTriggered(true);
    const button = document.querySelector('[data-chatbot-button]') as HTMLElement;
    if (button) {
      // Enhanced visual effects
      button.classList.add('animate-pulse', 'animate-bounce');
      button.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.9), 0 0 60px rgba(147, 51, 234, 0.6)';
      button.style.transform = 'scale(1.1)';

      // Show notification popup
      showNotificationPopup();

      setTimeout(() => {
        button.classList.remove('animate-pulse', 'animate-bounce');
        button.style.boxShadow = '';
        button.style.transform = '';
      }, 6000);
    }
  };

  const showNotificationPopup = () => {
    // Create notification popup
    const popup = document.createElement('div');
    popup.id = 'chatbot-notification';
    popup.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 300px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        animation: slideInRight 0.5s ease-out;
        cursor: pointer;
        border: 2px solid rgba(255,255,255,0.2);
      ">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          ">🤖</div>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px;">AI Assistant Ready!</div>
            <div style="font-size: 12px; opacity: 0.9;">Talk to our AI for instant help & quotes</div>
          </div>
        </div>
        <div style="
          position: absolute;
          top: -8px;
          right: -8px;
          width: 16px;
          height: 16px;
          background: #ef4444;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: white;
          cursor: pointer;
        " onclick="this.parentElement.remove()">×</div>
      </div>
      <style>
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    `;

    document.body.appendChild(popup);

    // Auto-remove after 8 seconds
    setTimeout(() => {
      const existingPopup = document.getElementById('chatbot-notification');
      if (existingPopup) {
        existingPopup.style.animation = 'slideInRight 0.5s ease-out reverse';
        setTimeout(() => existingPopup.remove(), 500);
      }
    }, 8000);

    // Click to open chatbot
    popup.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).textContent?.includes('×')) {
        setIsOpen(true);
        popup.remove();
      }
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("✨ **Welcome to SEVA MANTRA – Where Perfection is Standard.**\n\nTell us what you need, and we'll craft the flawless solution you deserve.", true, 500);
    }
  }, [isOpen]);

  // Enhanced scroll management
  useEffect(() => {
    if (!isOpen || !chatbotRef.current) return;

    let isMouseOverChatbot = false;
    const chatbotElement = chatbotRef.current;

    const handleMouseEnter = (e: MouseEvent) => {
      isMouseOverChatbot = true;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Prevent layout shift from scrollbar
    };

    const handleMouseLeave = (e: MouseEvent) => {
      isMouseOverChatbot = false;
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };

    const handleWheel = (e: WheelEvent) => {
      if (isMouseOverChatbot) {
        e.preventDefault();
        e.stopPropagation();

        const messagesContainer = chatbotElement.querySelector('[data-messages-container]') as HTMLElement;
        if (messagesContainer) {
          messagesContainer.scrollTop += e.deltaY;
        }
      }
    };

    // Add event listeners
    chatbotElement.addEventListener('mouseenter', handleMouseEnter);
    chatbotElement.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      chatbotElement.removeEventListener('mouseenter', handleMouseEnter);
      chatbotElement.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }, 100);
  };

  const addMessage = (content: string, type: 'bot' | 'user', isOption = false): Message => {
    const message: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isOption
    };
    setMessages(prev => [...prev, message]);
    return message;
  };

  const removeFormatting = (text: string) => {
    return text.replace(/\*\*/g, '');
  };

  const addBotMessage = (content: string, includeOptions = false, delay = 1000, optionsFlowState?: FlowState) => {
    setTimeout(() => {
      const cleanContent = removeFormatting(content);
      addMessage(cleanContent, 'bot');

      if (includeOptions) {
        setTimeout(() => {
          const optionsMessage: Message = {
            id: Date.now().toString(),
            type: 'bot',
            content: "Choose an option:",
            timestamp: new Date(),
            isOption: true,
            flowStateSnapshot: optionsFlowState || flowState
          };
          setMessages(prev => [...prev, optionsMessage]);
        }, 500);
      }
    }, delay);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    handleUserInput(inputValue);
    setInputValue('');
    setWaitingForInput(false);
  };

  const handleUserInput = (input: string) => {
    switch (flowState) {
      case 'pincode_input':
        // Validate pincode (6 digits)
        const pincodeRegex = /^\d{6}$/;
        if (!pincodeRegex.test(input)) {
          addBotMessage("❌ **Invalid pincode!** Please enter a valid 6-digit pincode.\n\n**Example:** 411001");
          setTimeout(() => setWaitingForInput(true), 1500);
          return;
        }
        setConversationData(prev => ({ ...prev, pincode: input }));
        setFlowState('contact_name_input');
        setWaitingForInput(false);
        addBotMessage("✅ **Perfect!** We're locking in the perfect plan for your project. Before proceeding, please give us your contact details.\n\n**Please provide your name:**");
        setTimeout(() => setWaitingForInput(true), 1500);
        break;

      case 'contact_name_input':
        // Validate name (at least 2 characters, no numbers)
        const nameRegex = /^[a-zA-Z\s]{2,}$/;
        if (!nameRegex.test(input.trim())) {
          addBotMessage("❌ **Invalid name!** Please enter a valid name (at least 2 characters, letters only).\n\n**Example:** John Doe");
          setTimeout(() => setWaitingForInput(true), 1500);
          return;
        }
        setConversationData(prev => ({ ...prev, name: input.trim() }));
        setFlowState('contact_phone_input');
        setWaitingForInput(false);
        addBotMessage(`✅ **Nice to meet you, ${input.trim()}!**\n\n**Now please provide your phone number:**`);
        setTimeout(() => setWaitingForInput(true), 1500);
        break;

      case 'contact_phone_input':
        // Validate phone number (10 digits, can start with 6,7,8,9)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(input.replace(/\s/g, ''))) {
          addBotMessage("❌ **Invalid phone number!** Please enter a valid 10-digit mobile number.\n\n**Format:** 9876543210\n**Note:** Should start with 6, 7, 8, or 9");
          setTimeout(() => setWaitingForInput(true), 1500);
          return;
        }
        setConversationData(prev => ({ ...prev, phone: input.replace(/\s/g, '') }));
        setWaitingForInput(false);

        if (['Commercial Cleaning', 'Renovation Services'].includes(conversationData.serviceCategory || '')) {
          const summaryLines = [
            `**Here is your request summary:**`,
            `• **Service**: ${conversationData.serviceCategory || 'N/A'}${conversationData.serviceType ? ` — ${conversationData.serviceType}` : ''}`,
            `• **Area**: ${conversationData.area || 'N/A'}`,
            `• **Pincode**: ${conversationData.pincode || 'N/A'}`,
            `• **Name**: ${conversationData.name || 'N/A'}`,
            `• **Phone**: ${input.replace(/\s/g, '')}`
          ].join('\n');

          completeConversation();
          addBotMessage(`✅ **Thank you!**\n\n${summaryLines}\n\nOur team will call you within 24 hours with next steps and a tailored quote.`, true);
          setTimeout(() => {
            setFlowState('post_completion_options');
            addBotMessage('Can I help you with any other query?', true, 0, 'post_completion_options');
          }, 2000);
        } else {
          setFlowState('package_selection');
          addBotMessage(`✅ **Perfect! Thank you ${conversationData.name}.**\n\nBased on your details, we can match you with our **exclusive packages** — each a different level of perfection.\n\nWould you like to explore them now before finalizing?`, true, 1000, 'package_selection');
        }
        break;

      case 'contact_input':
        // Parse the input to extract name and phone
        const contactParts = input.split(',').map(part => part.trim());
        if (contactParts.length >= 2) {
          const name = contactParts[0];
          const phone = contactParts[1];

          // Validate name
          const nameRegex = /^[a-zA-Z\s]{2,}$/;
          if (!nameRegex.test(name)) {
            addBotMessage("❌ **Invalid name!** Please enter a valid name (at least 2 characters, letters only).\n\n**Format:** Name, Phone Number\n**Example:** John Doe, 9876543210");
            setTimeout(() => setWaitingForInput(true), 1500);
            return;
          }

          // Validate phone number
          const phoneRegex = /^[6-9]\d{9}$/;
          if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            addBotMessage("❌ **Invalid phone number!** Please enter a valid 10-digit mobile number.\n\n**Format:** Name, Phone Number\n**Example:** John Doe, 9876543210\n**Note:** Phone should start with 6, 7, 8, or 9");
            setTimeout(() => setWaitingForInput(true), 1500);
            return;
          }

          setConversationData(prev => ({ ...prev, name, phone: phone.replace(/\s/g, '') }));

          if (['Commercial Cleaning', 'Renovation Services'].includes(conversationData.serviceCategory || '')) {
            const summaryLines = [
              `**Here is your request summary:**`,
              `• **Service**: ${conversationData.serviceCategory || 'N/A'}${conversationData.serviceType ? ` — ${conversationData.serviceType}` : ''}`,
              `• **Area**: ${conversationData.area || 'N/A'}`,
              `• **Pincode**: ${conversationData.pincode || 'N/A'}`,
              `• **Name**: ${name}`,
              `• **Phone**: ${phone.replace(/\s/g, '')}`
            ].join('\n');

            completeConversation();
            setTimeout(() => {
              addBotMessage(`✅ **Thank you!**\n\n${summaryLines}\n\nOur team will call you within 24 hours with next steps and a tailored quote.`, true);
              setFlowState('post_completion_options');
              addBotMessage('Can I help you with any other query?', true, 0, 'post_completion_options');
            }, 500);
          } else {
            setFlowState('package_selection');
            setTimeout(() => {
              addBotMessage(`✅ **Perfect! Thank you ${name}.**\n\nBased on your details, we can match you with our **exclusive packages** — each a different level of perfection.\n\nWould you like to explore them now before finalizing?`, true);
            }, 500);
          }
        } else {
          setTimeout(() => {
            addBotMessage("❌ **Invalid format!** Please provide both your **name and phone number** separated by a comma.\n\n**Format:** Name, Phone Number\n**Example:** John Doe, 9876543210");
          }, 500);
        }
        break;

      case 'commercial_area':
        setConversationData(prev => ({ ...prev, area: input }));
        setFlowState('pincode_input');
        setWaitingForInput(false);
        addBotMessage("Please provide your pincode");
        setTimeout(() => setWaitingForInput(true), 1500);
        break;

      case 'renovation_area':
        setConversationData(prev => ({ ...prev, area: input }));
        setFlowState('pincode_input');
        setWaitingForInput(false);
        addBotMessage("Please provide your pincode");
        setTimeout(() => setWaitingForInput(true), 1500);
        break;

      case 'custom_request':
        setConversationData(prev => ({ ...prev, customRequest: input }));
        setWaitingForInput(false);
        addBotMessage("Thank you for sharing your requirements! Our team will review this and get back to you with the perfect solution.");
        setTimeout(() => {
          setFlowState('post_completion_options');
          addBotMessage("Can I help you with anything else?", true, 0, 'post_completion_options');
        }, 2000);
        break;

      default:
        // Handle general queries
        handleGeneralQuery(input);
        break;
    }
  };

  const handleGeneralQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let response = "I understand you have a question. Let me help you with that!";

    const faq = predefinedQAs.find(qa =>
      lowerQuery.includes(qa.question.toLowerCase().split(' ')[0]) ||
      qa.answer.toLowerCase().includes(lowerQuery.substring(0, 10))
    );

    if (faq) {
      response = faq.answer;
    } else {
      response = "For specific questions, I'd recommend speaking to our executive directly. They can provide detailed information about our services.";
    }

    addBotMessage(response);
    setTimeout(() => {
      setFlowState('post_completion_options');
      addBotMessage("Can I help you with anything else?", true, 0, 'post_completion_options');
    }, 2000);
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, 'user');
    setWaitingForInput(false);

    switch (option) {
      // Main Menu Options
      case 'Residential Cleaning':
        setConversationData(prev => ({ ...prev, serviceCategory: 'Residential Cleaning' }));
        setFlowState('residential_type');
        addBotMessage("Perfect! What type of residential cleaning do you need?", true, 1000, 'residential_type');
        break;

      case 'Commercial Cleaning':
        setConversationData(prev => ({ ...prev, serviceCategory: 'Commercial Cleaning' }));
        setFlowState('commercial_type');
        addBotMessage("Excellent choice! What type of commercial cleaning are you looking for?", true, 1000, 'commercial_type');
        break;

      case 'Renovation Services':
        setConversationData(prev => ({ ...prev, serviceCategory: 'Renovation Services' }));
        setFlowState('renovation_type');
        addBotMessage("Great! What type of renovation service do you need?", true, 1000, 'renovation_type');
        break;

      case 'Speak to an Executive':
        addBotMessage("**Connect with Our Expert Team:**\n\n📞 **Call:** 92094 47145\n💬 **WhatsApp:** Instant response guaranteed\n\n🕐 **Available:** Business hours for your convenience\n📍 **Service Areas:** Pune, PCMC & surrounding areas\n\n**Our executives are ready to craft your perfect solution!**", true, 1000, 'main_menu');
        break;

      case 'Got Questions?':
        setFlowState('faqs');
        const faqList = predefinedQAs.map((qa, index) => `${index + 1}. ${qa.question}`).join('\n');
        addBotMessage(`**❓ Frequently Asked Questions:**\n\n${faqList}\n\nClick on any question above or ask your own!`, true, 1000, 'faqs');
        break;

      case 'Custom Request':
        setFlowState('custom_request');
        addBotMessage("**📝 Tell us about your specific requirements:**\n\nDescribe your custom needs and we'll craft the perfect solution for you.");
        setTimeout(() => setWaitingForInput(true), 1500);
        break;

      // Residential Flow
      case 'Deep Cleaning':
      case 'Handover Cleaning':
        setConversationData(prev => ({ ...prev, serviceType: option }));
        if (flowState === 'residential_type') {
          setFlowState('residential_home');
          addBotMessage("What type of home will we be perfecting?", true, 1000, 'residential_home');
        } else if (flowState === 'commercial_type') {
          setFlowState('commercial_business');
          addBotMessage("What type of business space are we transforming?", true, 1000, 'commercial_business');
        }
        break;

      case '2BHK':
      case '3BHK':
      case 'Bungalow':
        setConversationData(prev => ({ ...prev, homeType: option }));
        setFlowState('pincode_input');
        addBotMessage("Please provide your pincode");
        setTimeout(() => setWaitingForInput(true), 1500);
        break;

      // Commercial Flow
      case 'Total Cleaning':
      case 'Carpet Cleaning':
        setConversationData(prev => ({ ...prev, serviceType: option }));
        setFlowState('commercial_business');
        addBotMessage("What type of business space are we transforming?", true, 1000, 'commercial_business');
        break;

      case 'Office':
      case 'Shop':
      case 'Showroom':
      case 'Warehouse':
      case 'School':
      case 'Hospital':
      case 'Hotel':
      case 'Restaurant':
        setConversationData(prev => ({ ...prev, businessType: option }));
        setFlowState('commercial_area');
        addBotMessage("**What's the area in square feet?** (This helps us plan the perfect approach)");
        setTimeout(() => setWaitingForInput(true), 1500);
        break;












      // Renovation Flow
      case 'End-to-End Renovation':
      case 'Furniture Upgradation':
      case 'Painting Renovation':
        setConversationData(prev => ({ ...prev, serviceType: option }));
        setFlowState('renovation_project');
        addBotMessage("What type of project are we working on?", true, 1000, 'renovation_project');
        break;

      case 'Residential Flat':
      case 'Villa':
      case 'Commercial Office':
      case 'Café':
      case 'Retail Store':
        setConversationData(prev => ({ ...prev, businessType: option }));
        setFlowState('renovation_area');
        addBotMessage("**What's the area?** (e.g., 2BHK, 3BHK, 1000 sqft)");
        setTimeout(() => setWaitingForInput(true), 1500);
        break;

      // Package Selection
      case 'Yes, Show Me the Packages':
        setFlowState('package_details'); // New state for package details
        addBotMessage("**🌟 Our Home Cleaning Packages:**\n\n**💎 Basic Care Package**\n• Dry floor cleaning\n• Professional mopping\n• Ideal for unfurnished flats, quick refreshes, light upkeep\n\n**⭐ Advanced Deep-Care Package** (Most Popular)\n• Washroom deep scrubbing (7 chemicals + 2 machines)\n• Furniture cleaning (outside surfaces)\n• Window chemical wash (streak-free)\n• Lights & switchboards cleaning\n• Wall dry cleaning\n\n**👑 Premium Shine & Protection Package**\n• Walls – dry + chemical wash\n• Complete furniture deep cleaning (inside + outside)\n• Appliances deep cleaning (fridge, microwave, washing machine, more)\n• Floor deep scrubbing (polished, stain-free finish)\n\nWhich package would you like to choose?", true, 1000, 'package_details');
        break;

      case 'No, Schedule a Call':
      case 'Request a Call':
        completeConversation();
        addBotMessage("**Perfect!** Our team will call you within 24 hours to discuss your requirements and provide a customized quote.\n\n📞 **Emergency Contact:** 92094 47145\n📸 **Follow us:** [Instagram Profile](https://instagram.com/skcleaningservices)\n\n**Thank you for choosing SEVA MANTRA – Where Perfection is Standard!**");

        // Wait 3 seconds then show post-completion options
        setTimeout(() => {
          setFlowState('post_completion_options');
          addBotMessage("Can I help you with any other query?", true, 0, 'post_completion_options');
        }, 3000);
        break;

      case 'Basic Care Package':
      case 'Advanced Deep-Care Package':
      case 'Premium Shine & Protection Package':
        setConversationData(prev => ({ ...prev, selectedPackage: option }));
        completeConversation();
        addBotMessage(`**Excellent choice!** You've selected our **${option}**.\n\nOur team will call you within 24 hours with your customized plan and next steps.\n\n📞 **Emergency Contact:** 92094 47145\n📸 **Follow us:** [Instagram Profile](https://instagram.com/skcleaningservices)\n\n**Thank you for choosing SEVA MANTRA!**`);

        // Wait 3 seconds then show post-completion options
        setTimeout(() => {
          setFlowState('post_completion_options');
          addBotMessage("Can I help you with any other query?", true, 0, 'post_completion_options');
        }, 3000);
        break;

      // Persistent Options
      case 'Restart Conversation':
        restartConversation();
        break;

      // Other/Custom inputs
      case 'Other':
        setConversationData(prev => ({ ...prev, serviceType: 'Other' }));
        setFlowState('contact_name_input');
        addBotMessage("**Our team will reach out to you. Just provide us with your contact details.**\n\n**Please provide your name:**");
        setTimeout(() => setWaitingForInput(true), 1500);
        break;

      // Post-completion options
      case 'New Service Request':
        restartConversation();
        break;

      case 'Call Now':
        addBotMessage("**📞 Call us now at: 92094 47145**\n\nOur executive is available during business hours to assist you!\n\n**Service Areas:** Pune, PCMC & surrounding areas");
        setTimeout(() => {
          setFlowState('post_completion_options');
          addBotMessage("Can I help you with anything else?", true, 0, 'post_completion_options');
        }, 3000);
        break;

      case 'Thank You':
        addBotMessage("**Thank you for choosing SEVA MANTRA – Where Perfection is Standard!** ✨\n\nHave a wonderful day!");
        // Auto-minimize chatbot after 3 seconds on mobile
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
        break;

      case 'No Questions':
        setFlowState('post_completion_options');
        addBotMessage("No problem! Here are your options:", true, 0, 'post_completion_options');
        break;

      default:
        // Handle FAQ questions
        const faq = predefinedQAs.find(qa => qa.question === option);
        if (faq) {
          addBotMessage(faq.answer, true);
        }
        break;
    }
  };

  const completeConversation = async () => {
    const finalData: ConversationData = {
      ...conversationData,
      timestamp: new Date()
    } as ConversationData;

    setAllConversations(prev => [...prev, finalData]);

    // Generate session ID
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Send lead data to backend API
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://your-backend-url.railway.app';
      const response = await fetch(`${backendUrl}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        console.log('Lead saved to backend successfully');
        // Add notification that admin has been contacted
        addBotMessage("✅ **Perfect! Your information has been submitted successfully.**\n\n📱 *Our admin team has been notified via WhatsApp and will contact you shortly.*\n\n⏰ *Expected response time: Within 2-4 hours*\n\nThank you for choosing SEVA MANTRA!", true, 1000);
      }
    } catch (error) {
      console.log('Backend not available, lead saved locally only');
    }

    // Send chat history to backend API - DISABLED as per request
    /*
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://your-backend-url.railway.app';
      const chatHistoryData = {
        sessionId,
        clientName: finalData.name || 'Anonymous',
        clientPhone: finalData.phone || 'N/A',
        messages: messages.map(msg => ({
          id: msg.id,
          type: msg.type,
          content: msg.content,
          timestamp: msg.timestamp,
          isOption: msg.isOption,
          flowStateSnapshot: msg.flowStateSnapshot
        })),
        conversationData: finalData,
        startTime: messages[0]?.timestamp || new Date(),
        endTime: new Date()
      };
      
      const chatResponse = await fetch(`${backendUrl}/api/chat-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatHistoryData),
      });
      
      if (chatResponse.ok) {
        console.log('Chat history saved to backend successfully');
      }
    } catch (error) {
      console.log('Failed to save chat history to backend:', error);
    }
    */

    // Don't change flow state here - let the calling function handle it
  };

  const restartConversation = () => {
    setMessages([]);
    setConversationData({});
    setFlowState('main_menu');
    addBotMessage("✨ **Welcome back to SEVA MANTRA – Where Perfection is Standard.**\n\nHow can we help you achieve perfection today?", true, 500);
  };

  const exportToExcel = () => {
    if (allConversations.length === 0) {
      addBotMessage("No conversation data to export yet!");
      return;
    }

    const worksheetData = allConversations.map(conv => ({
      'Date': conv.timestamp.toLocaleDateString(),
      'Time': conv.timestamp.toLocaleTimeString(),
      'Name': conv.name || 'N/A',
      'Phone': conv.phone || 'N/A',
      'Service Category': conv.serviceCategory || 'N/A',
      'Service Type': conv.serviceType || 'N/A',
      'Business Type': conv.businessType || 'N/A',
      'Home Type': conv.homeType || 'N/A',
      'Area': conv.area || 'N/A',
      'Pincode': conv.pincode || 'N/A',
      'Selected Package': conv.selectedPackage || 'N/A',
      'Custom Request': conv.customRequest || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SEVA MANTRA Leads');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(data, `SEVA_MANTRA_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
    addBotMessage("📊 Lead data exported successfully!");
  };

  const renderMessageContent = (message: Message) => {
    if (message.isOption) {
      return (
        <div className="space-y-2 mt-2">
          <div className="grid grid-cols-1 gap-2">
            {renderOptionsForState(message.flowStateSnapshot || flowState)}
          </div>
        </div>
      );
    }

    return (
      <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed">
        {message.content}
      </div>
    );
  };

  const renderOptionsForState = (state: FlowState) => {
    switch (state) {
      case 'main_menu':
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Residential Cleaning')} className="justify-start text-left hover:bg-blue-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-blue-200">
              🏠 Residential Cleaning
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Commercial Cleaning')} className="justify-start text-left hover:bg-green-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-green-200">
              🏢 Commercial Cleaning
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Renovation Services')} className="justify-start text-left hover:bg-purple-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-purple-200">
              🛠 Renovation Services
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Speak to an Executive')} className="justify-start text-left hover:bg-orange-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-orange-200">
              📞 Speak to an Executive (Call/WhatsApp)
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Got Questions?')} className="justify-start text-left hover:bg-yellow-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-yellow-200">
              ❓ Got Questions? (FAQs)
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Custom Request')} className="justify-start text-left hover:bg-gray-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-gray-200">
              ✏ Custom Request
            </Button>
          </>
        );

      case 'residential_type':
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Deep Cleaning')} className="justify-start text-left hover:bg-blue-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Deep Cleaning
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Handover Cleaning')} className="justify-start text-left hover:bg-green-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Handover Cleaning
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Other')} className="justify-start text-left hover:bg-gray-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Other
            </Button>
          </>
        );

      case 'residential_home':
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('2BHK')} className="justify-start text-left hover:bg-blue-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              2BHK
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('3BHK')} className="justify-start text-left hover:bg-green-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              3BHK
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Bungalow')} className="justify-start text-left hover:bg-purple-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Bungalow
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Other')} className="justify-start text-left hover:bg-gray-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Other
            </Button>
          </>
        );

      case 'commercial_type':
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Deep Cleaning')} className="justify-start text-left hover:bg-blue-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Deep Cleaning
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Total Cleaning')} className="justify-start text-left hover:bg-green-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Total Cleaning
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Carpet Cleaning')} className="justify-start text-left hover:bg-purple-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Carpet Cleaning
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Handover Cleaning')} className="justify-start text-left hover:bg-orange-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Handover Cleaning
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Other')} className="justify-start text-left hover:bg-gray-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Other
            </Button>
          </>
        );

      case 'commercial_business':
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Office')} className="justify-start text-left hover:bg-blue-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Office
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Shop')} className="justify-start text-left hover:bg-green-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Shop
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Showroom')} className="justify-start text-left hover:bg-purple-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Showroom
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Warehouse')} className="justify-start text-left hover:bg-orange-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Warehouse
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('School')} className="justify-start text-left hover:bg-yellow-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              School
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Hospital')} className="justify-start text-left hover:bg-red-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Hospital
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Hotel')} className="justify-start text-left hover:bg-teal-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Hotel
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Restaurant')} className="justify-start text-left hover:bg-pink-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Restaurant
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Other')} className="justify-start text-left hover:bg-gray-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Other
            </Button>
          </>
        );











      case 'renovation_type':
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('End-to-End Renovation')} className="justify-start text-left hover:bg-blue-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              End-to-End Renovation
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Furniture Upgradation')} className="justify-start text-left hover:bg-green-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Furniture Upgradation
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Painting Renovation')} className="justify-start text-left hover:bg-purple-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Painting Renovation
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Other')} className="justify-start text-left hover:bg-gray-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Other
            </Button>
          </>
        );

      case 'renovation_project':
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Residential Flat')} className="justify-start text-left hover:bg-blue-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Residential Flat
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Villa')} className="justify-start text-left hover:bg-green-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Villa
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Commercial Office')} className="justify-start text-left hover:bg-purple-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Commercial Office
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Café')} className="justify-start text-left hover:bg-orange-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Café
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Retail Store')} className="justify-start text-left hover:bg-yellow-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Retail Store
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Other')} className="justify-start text-left hover:bg-gray-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              Other
            </Button>
          </>
        );

      case 'package_selection':
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Yes, Show Me the Packages')} className="justify-start text-left hover:bg-blue-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-blue-200">
              <span className="hidden sm:inline">Yes, Show Me the Packages</span>
              <span className="sm:hidden">Show Packages</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('No, Schedule a Call')} className="justify-start text-left hover:bg-green-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-green-200">
              <span className="hidden sm:inline">No, Schedule a Call</span>
              <span className="sm:hidden">Schedule Call</span>
            </Button>
          </>
        );

      case 'package_details':
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Basic Care Package')} className="justify-start text-left hover:bg-blue-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-blue-200">
              <span className="hidden sm:inline">💎 Choose Basic Care Package</span>
              <span className="sm:hidden">💎 Basic Care</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Advanced Deep-Care Package')} className="justify-start text-left hover:bg-green-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-green-200">
              <span className="hidden sm:inline">⭐ Choose Advanced Deep-Care Package</span>
              <span className="sm:hidden">⭐ Advanced Care</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Premium Shine & Protection Package')} className="justify-start text-left hover:bg-purple-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-purple-200">
              <span className="hidden sm:inline">👑 Choose Premium Shine & Protection</span>
              <span className="sm:hidden">👑 Premium Shine</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Request a Call')} className="justify-start text-left hover:bg-orange-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px] border-orange-200">
              <span className="hidden sm:inline">📞 Request a Call Instead</span>
              <span className="sm:hidden">📞 Call Instead</span>
            </Button>
          </>
        );

      case 'faqs':
        return (
          <>
            {predefinedQAs.map((qa, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => handleOptionClick(qa.question)}
                className="justify-start text-left hover:bg-blue-50 text-xs p-2 h-auto min-h-[32px] w-full"
              >
                {qa.question}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOptionClick('No Questions')}
              className="justify-start text-left hover:bg-gray-50 text-xs p-2 h-auto min-h-[32px] w-full border-gray-200 mt-2"
            >
              ✨ No Questions - Back to Options
            </Button>
          </>
        );

      case 'post_completion_options':
        return (
          <>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('New Service Request')} className="justify-start text-left hover:bg-blue-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              <span className="hidden sm:inline">🏠 New Service Request</span>
              <span className="sm:hidden">🏠 New Request</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Call Now')} className="justify-start text-left hover:bg-green-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              <span className="hidden sm:inline">📞 Call Now (92094 47145)</span>
              <span className="sm:hidden">📞 Call Now</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Got Questions?')} className="justify-start text-left hover:bg-yellow-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              <span className="hidden sm:inline">❓ Got Questions? (FAQs)</span>
              <span className="sm:hidden">❓ FAQs</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOptionClick('Thank You')} className="justify-start text-left hover:bg-gray-50 text-xs sm:text-sm p-2 sm:p-3 h-auto min-h-[36px]">
              <span className="hidden sm:inline">✨ No, Thank You!</span>
              <span className="sm:hidden">✨ No Thanks</span>
            </Button>
          </>
        );

      default:
        return null;
    }
  };

  const renderOptionsForCurrentState = () => {
    return renderOptionsForState(flowState);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        data-chatbot-button
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 ${isOpen ? 'hidden' : 'flex'} ${hasTriggered ? 'ring-4 ring-blue-400 ring-opacity-50' : ''}`}
        style={{
          animation: hasTriggered ? 'pulse 2s infinite, bounce 1s infinite' : 'none'
        }}
      >
        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
        {hasTriggered && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-ping">
            !
          </div>
        )}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          ref={chatbotRef}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[calc(100vh-2rem)] sm:h-[75vh] sm:max-h-[750px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{
            background: '#ffffff',
            boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Speech bubble tail */}
          <div className="absolute -bottom-3 right-4 sm:right-8">
            <div className="w-6 h-6 bg-white border-r border-b border-gray-200 transform rotate-45 shadow-md"></div>
          </div>
          {/* Header */}
          <div className="bg-gray-700 text-white p-4 flex items-center justify-between relative rounded-t-2xl"
            style={{
              background: '#0F172A',
              borderBottom: '1px solid #e5e5e5'
            }}>

            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="flex-shrink-0">
                <img src="/favicon.ico" alt="SEVA MANTRA" className="w-10 h-10" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm truncate">SEVA MANTRA</h3>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* <Button
                variant="ghost"
                size="sm"
                onClick={exportToExcel}
                className="text-white hover:bg-white/20 p-2"
                title="Export Lead Data"
              >
                <Download className="w-4 h-4" />
              </Button> */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded hidden sm:flex"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50 scroll-smooth"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              maxHeight: 'calc(100vh - 200px)'
            }}
            data-messages-container="true"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] sm:max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`px-3 py-2 rounded-lg text-sm leading-relaxed ${message.type === 'user'
                      ? 'bg-blue-500 text-white ml-auto'
                      : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
                      }`}
                  >
                    {renderMessageContent(message)}
                  </div>
                  <div className={`text-xs text-gray-400 mt-1 px-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
                  {message.type === 'user' ? (
                    <div className="bg-gray-400 w-7 h-7 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 flex items-center justify-center">
                      <img src="/favicon.ico" alt="SEVA MANTRA" className="w-7 h-7" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t bg-white rounded-b-2xl">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg sm:hidden flex-shrink-0"
                title="Minimize Chatbot"
              >
                <Minimize className="w-4 h-4" />
              </Button>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  flowState === 'pincode_input' ? "Enter your pincode..." :
                    flowState === 'contact_name_input' ? "Enter your name..." :
                      flowState === 'contact_phone_input' ? "Enter your phone number..." :
                        flowState === 'contact_input' ? "Name, Phone Number (e.g., John Doe, 9876543210)" :
                          flowState === 'commercial_area' ? "Enter area in sqft..." :
                            flowState === 'renovation_area' ? "Enter area details..." :
                              flowState === 'custom_request' ? "Describe your requirements..." :
                                "Type your message..."
                }
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className={`flex-1 text-sm h-10 rounded-lg border transition-all duration-300 ${waitingForInput
                  ? 'border-red-500 border-2 shadow-lg ring-2 ring-red-200 animate-pulse focus:border-red-600 focus:ring-red-300'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                style={{ fontSize: '16px' }}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 min-w-[44px] h-10 rounded-lg"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
