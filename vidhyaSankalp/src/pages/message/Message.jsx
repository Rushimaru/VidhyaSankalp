import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample contacts data (from HTML)
const initialContacts = [
  { id: 1, name: 'Kathryn Murphy', image: 'chat/2.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 2, name: 'James Michael', image: 'chat/3.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 3, name: 'Russell Lucas', image: 'chat/4.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: false },
  { id: 4, name: 'Caleb Bradley', image: 'chat/5.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: false },
  { id: 5, name: 'Bobby Roy', image: 'chat/6.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 6, name: 'Vincent Liam', image: 'chat/7.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 7, name: 'Randy Mason', image: 'chat/8.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 8, name: 'Albert Wayne', image: 'chat/9.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 9, name: 'Elijah Willie', image: 'chat/10.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 10, name: 'Kathryn Murphy', image: 'chat/2.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 11, name: 'James Michael', image: 'chat/3.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 12, name: 'Russell Lucas', image: 'chat/4.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: false },
  { id: 13, name: 'Caleb Bradley', image: 'chat/5.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: false },
  { id: 14, name: 'Bobby Roy', image: 'chat/6.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 15, name: 'Vincent Liam', image: 'chat/7.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 16, name: 'Randy Mason', image: 'chat/8.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 17, name: 'Albert Wayne', image: 'chat/9.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
  { id: 18, name: 'Elijah Willie', image: 'chat/10.png', lastMessage: 'hey! there i\'m...', time: '12:30 PM', unread: 8, active: true },
];

// Sample messages for the active contact (from HTML)
const sampleMessages = [
  {
    id: 1,
    sender: 'other',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    time: '6.30 pm',
  },
  {
    id: 2,
    sender: 'me',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    time: '6.30 pm',
  },
  {
    id: 3,
    sender: 'other',
    text: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default. Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.',
    time: '6.30 pm',
  },
];

const Message = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContactId, setSelectedContactId] = useState(1); // default to first contact
  const [messages, setMessages] = useState(sampleMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedContact = contacts.find((c) => c.id === selectedContactId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleClearAll = () => {
    // Clear all messages for the selected contact
    setMessages([]);
  };

  const handleBlock = () => {
    // Block the contact – in a real app you'd update status
    alert(`Block ${selectedContact?.name}`);
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Message</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Message</span>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <div className="chat-wrapper">
          {/* Sidebar */}
          <div className="chat-sidebar card">
            <div className="px-24 py-16">
              <form className="navbar-search d-block" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  className="bg-transparent w-100"
                  name="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <iconify-icon icon="ion:search-outline" className="icon"></iconify-icon>
              </form>
            </div>
            <div className="chat-all-list">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`chat-sidebar-single ${selectedContactId === contact.id ? 'active' : ''}`}
                  onClick={() => setSelectedContactId(contact.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="img">
                    <img src={`../src/assets/images/${contact.image}`} alt={contact.name} />
                  </div>
                  <div className="info">
                    <h6 className="text-sm mb-1">{contact.name}</h6>
                    <p className="mb-0 text-xs">{contact.lastMessage}</p>
                  </div>
                  <div className="action text-end">
                    <p className="mb-0 text-neutral-400 text-xs lh-1">{contact.time}</p>
                    {contact.unread > 0 && (
                      <span className="w-16-px h-16-px text-xs rounded-circle bg-warning-main text-white d-inline-flex align-items-center justify-content-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat */}
          <div className="chat-main card">
            {selectedContact && (
              <>
                <div className="chat-sidebar-single active">
                  <div className="img">
                    <img src={`../src/assets/images/${selectedContact.image}`} alt={selectedContact.name} />
                  </div>
                  <div className="info">
                    <h6 className="text-md mb-0">{selectedContact.name}</h6>
                    <p className="mb-0">Available</p>
                  </div>
                  <div className="action d-inline-flex align-items-center gap-3">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="text-primary-light text-xl"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="false"
                      >
                        <iconify-icon icon="tabler:dots-vertical"></iconify-icon>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-lg-end border">
                        <li>
                          <button
                            className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2"
                            type="button"
                            onClick={handleClearAll}
                          >
                            <iconify-icon icon="mdi:clear-circle-outline"></iconify-icon>
                            Clear All
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2"
                            type="button"
                            onClick={handleBlock}
                          >
                            <iconify-icon icon="ic:baseline-block"></iconify-icon>
                            Block
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="chat-message-list">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`chat-single-message ${msg.sender === 'me' ? 'right' : 'left'}`}>
                      {msg.sender === 'other' && (
                        <img
                          src={`../src/assets/images/${selectedContact.image}`}
                          alt="avatar"
                          className="avatar-lg object-fit-cover rounded-circle"
                        />
                      )}
                      <div className="chat-message-content">
                        <p className="mb-3">{msg.text}</p>
                        <p className="chat-time mb-0">
                          <span>{msg.time}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <form className="chat-message-box" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    name="chatMessage"
                    placeholder="Write message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <div className="chat-message-box-action">
                    <button type="button" className="text-xl">
                      <iconify-icon icon="ph:link"></iconify-icon>
                    </button>
                    <button type="button" className="text-xl">
                      <iconify-icon icon="solar:gallery-linear"></iconify-icon>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary-600 radius-8 d-inline-flex align-items-center gap-1"
                    >
                      Send
                      <iconify-icon icon="f7:paperplane"></iconify-icon>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;