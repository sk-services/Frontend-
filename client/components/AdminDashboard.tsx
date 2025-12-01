import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Users,
  MessageCircle,
  Download,
  RefreshCw,
  Search,
  Phone,
  Calendar,
  MapPin,
  Package
} from 'lucide-react';

interface Lead {
  _id: string;
  timestamp: string;
  name: string;
  phone: string;
  serviceCategory: string;
  serviceType: string;
  businessType: string;
  homeType: string;
  area: string;
  pincode: string;
  selectedPackage: string;
  customRequest: string;
}

interface ChatHistory {
  sessionId: string;
  clientName: string;
  clientPhone: string;
  conversationData: any;
  startTime: string;
  endTime: string;
  messages: any[];
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'chat'>('leads');

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const fetchLeads = async () => {
    setLoading(true);
    console.log('🔄 [Admin] Fetching leads from:', `${backendUrl}/api/leads`);
    try {
      const response = await fetch(`${backendUrl}/api/leads`);
      console.log('PY [Admin] Response status:', response.status);

      const data = await response.json();
      console.log('📦 [Admin] Leads data received:', data);

      if (data.success) {
        console.log(`✅ [Admin] Successfully loaded ${data.leads.length} leads`);
        setLeads(data.leads);
      } else {
        console.error('❌ [Admin] Failed to load leads:', data.message);
      }
    } catch (error) {
      console.error('❌ [Admin] Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChatHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/chat-history`);
      const data = await response.json();
      if (data.success) {
        setChatHistory(data.chatHistory);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 [Admin] Dashboard mounted, fetching data...');
    fetchLeads();
    fetchChatHistory();
  }, []);

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    lead.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChatHistory = chatHistory.filter(chat =>
    chat.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.clientPhone.includes(searchTerm) ||
    chat.sessionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Converted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const deleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;

    console.log('🗑️ [Admin] Deleting lead with ID:', id);
    try {
      const response = await fetch(`${backendUrl}/api/leads/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log('📦 [Admin] Delete response:', data);

      if (data.success) {
        console.log('✅ [Admin] Lead deleted successfully');
        setLeads(leads.filter(lead => lead._id !== id));
      } else {
        console.error('❌ [Admin] Failed to delete lead:', data.message);
        alert('Failed to delete lead');
      }
    } catch (error) {
      console.error('❌ [Admin] Error deleting lead:', error);
      alert('Error deleting lead');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SEVA MANTRA Admin Dashboard</h1>
          <p className="text-gray-600">Manage leads and chat history from Google Sheets</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
              <p className="text-xs text-muted-foreground">
                +{leads.filter(lead => new Date(lead.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length} from last 24h
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{chatHistory.length}</div>
              <p className="text-xs text-muted-foreground">
                +{chatHistory.filter(chat => new Date(chat.startTime) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length} from last 24h
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {leads.length > 0 ? Math.round((leads.filter(lead => lead.selectedPackage).length / leads.length) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Package selection rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'leads' ? 'default' : 'outline'}
            onClick={() => setActiveTab('leads')}
          >
            <Users className="w-4 h-4 mr-2" />
            Leads ({leads.length})
          </Button>
          <Button
            variant={activeTab === 'chat' ? 'default' : 'outline'}
            onClick={() => setActiveTab('chat')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat History ({chatHistory.length})
          </Button>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, phone, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={activeTab === 'leads' ? fetchLeads : fetchChatHistory} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={() => exportToCSV(
                activeTab === 'leads' ? filteredLeads : filteredChatHistory,
                activeTab === 'leads' ? 'seva_mantra_leads' : 'seva_mantra_chat_history'
              )}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'leads' ? (
          <div className="grid gap-4">
            {filteredLeads.map((lead, index) => (
              <Card key={lead._id || index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold">{lead.name}</h3>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{lead.phone}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Service:</span>
                          <div className="text-gray-600">{lead.serviceCategory}</div>
                          {lead.serviceType && <div className="text-gray-500">{lead.serviceType}</div>}
                        </div>

                        <div>
                          <span className="font-medium">Location:</span>
                          <div className="text-gray-600">{lead.pincode}</div>
                          {lead.area && <div className="text-gray-500">{lead.area}</div>}
                        </div>

                        <div>
                          <span className="font-medium">Package:</span>
                          <div className="text-gray-600">{lead.selectedPackage || 'Not selected'}</div>
                        </div>

                        <div>
                          <span className="font-medium">Date:</span>
                          <div className="text-gray-600">{formatDate(lead.timestamp)}</div>
                        </div>
                      </div>

                      {lead.customRequest && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Custom Request:</span>
                          <div className="text-gray-600 mt-1">{lead.customRequest}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <a
                        href={`tel:${lead.phone}`}
                        className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                      <a
                        href={`https://wa.me/91${lead.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        WhatsApp
                      </a>
                      <Button
                        variant="destructive"
                        onClick={() => deleteLead(lead._id)}
                        className="w-full"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredLeads.length === 0 && !loading && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No leads found</p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredChatHistory.map((chat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold">{chat.clientName}</h3>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{chat.clientPhone}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Session ID:</span>
                          <div className="text-gray-600 font-mono text-xs">{chat.sessionId}</div>
                        </div>

                        <div>
                          <span className="font-medium">Service:</span>
                          <div className="text-gray-600">{chat.conversationData.serviceCategory || 'N/A'}</div>
                          {chat.conversationData.serviceType && (
                            <div className="text-gray-500">{chat.conversationData.serviceType}</div>
                          )}
                        </div>

                        <div>
                          <span className="font-medium">Start Time:</span>
                          <div className="text-gray-600">{formatDate(chat.startTime)}</div>
                        </div>

                        <div>
                          <span className="font-medium">End Time:</span>
                          <div className="text-gray-600">{chat.endTime ? formatDate(chat.endTime) : 'Ongoing'}</div>
                        </div>
                      </div>

                      {chat.conversationData.selectedPackage && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">Selected Package:</span>
                          <div className="text-blue-700 mt-1">{chat.conversationData.selectedPackage}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <a
                        href={`tel:${chat.clientPhone}`}
                        className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                      <a
                        href={`https://wa.me/91${chat.clientPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredChatHistory.length === 0 && !loading && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No chat history found</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

