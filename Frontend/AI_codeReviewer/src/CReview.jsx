import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CReview.css';
import Prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";
import { Helmet } from 'react-helmet';



const CReview = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

    
  // Highlight code whenever it changes or when component mounts
  useEffect(() => {
    if (Prism) {
      Prism.highlightAll();
    }
  }, [code, review]);

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C'},
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'rust', label: 'Rust' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sql', label: 'SQL' },
  ];

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      
      // Try to detect language from file extension
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const extensionToLanguage = {
        'js': 'javascript',
        'py': 'python',
        'java': 'java',
        'cs': 'csharp',
        'cpp': 'cpp',
        'c': 'c',
        'php': 'php',
        'rb': 'ruby',
        'go': 'go',
        'ts': 'typescript',
        'swift': 'swift',
        'kt': 'kotlin',
        'rs': 'rust',
        'html': 'html',
        'css': 'css',
        'sql': 'sql',
      };
      
      if (extensionToLanguage[fileExtension]) {
        setLanguage(extensionToLanguage[fileExtension]);
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
        setShowUploadModal(false);
      };
      reader.readAsText(file);
    }
  };

  const submitForReview = async () => {
    if (!code.trim()) {
      setError('Please enter or upload some code to review.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setReview(null);

    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

    try {
      // Including explicit headers for CORS compatibility
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/ai/get-review`, {
        code,
        language
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setReview(response.data);
      console.log('Review data received:', response.data);
    } catch (err) {
      setError('Error submitting code for review. Please try again later.');
      console.error('Error:', err);
      
      // More detailed error logging for debugging
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received:', err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    setCode('');
    setReview(null);
    setError(null);
    setUploadedFile(null);
  };

  // Helper function to render code blocks with Prism syntax highlighting
  const renderCodeBlock = (code, language) => {
    return (
      <pre className={`language-${language}`}>
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    );
  };

  // Split review into sections based on markdown headers
  const renderFormattedReview = () => {
    if (!review) return null;
    
    // Simple markdown parsing for headers and code blocks
    const sections = review.split(/#{2,3} /g);
    
    return sections.map((section, index) => {
      if (!section.trim()) return null;
      
      // Extract section title and content
      const lines = section.split('\n');
      const title = lines[0];
      const content = lines.slice(1).join('\n');
      
      return (
        <div key={index} className="review-section">
          {index > 0 && <h3>{title}</h3>}
          <div className="review-content">
            {content.split('```').map((part, idx) => {
              if (idx % 2 === 1) {
                // This is a code block
                const codeLines = part.split('\n');
                const codeLang = codeLines[0] || 'javascript';
                const codeContent = codeLines.slice(1).join('\n');
                
                return (
                  <div key={idx} className="code-block-container">
                    {renderCodeBlock(codeContent, codeLang)}
                  </div>
                );
              } else {
                // This is regular text
                return <div key={idx} dangerouslySetInnerHTML={{__html: part.replace(/\n/g, '<br/>')}} />;
              }
            })}
          </div>
        </div>
      );
    });
  };

  return (
<>
<Helmet>
        <title>CodeGuardian - AI Code Review</title>
        <meta name="description" content="AI-Powered Code Review for Elite Developers" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Logo.png" />
      </Helmet>
    <div className="code-reviewer-container">
      <div className="header">
        <div className="logo-container">
          <div className="logo">
            <span className="code-symbol">&lt;/&gt;</span>
            <span className="ai-dot">•</span>
          </div>
          <h1>CodeGuardian</h1>
        </div>
        <p className="tagline">AI-Powered Code Review for Elite Developers</p>
      </div>

      <div className="main-content">
        <div className="code-input-section">
          <div className="toolbar">
            <div className="language-selector">
              <label htmlFor="language-select">Language:</label>
              <select 
                id="language-select" 
                value={language} 
                onChange={handleLanguageChange}
              >
                {languageOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="actions">
              <button 
                className="upload-btn"
                onClick={() => setShowUploadModal(true)}
              >
                Upload File
              </button>
              <button 
                className="clear-btn"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className="code-editor">
            <textarea 
              value={code}
              onChange={handleCodeChange}
              placeholder="Paste your code here or upload a file..."
              spellCheck="false"
            />
          </div>
          
          <button 
            className="submit-btn"
            onClick={submitForReview}
            disabled={isLoading || !code.trim()}
          >
            {isLoading ? 'Analyzing Code...' : 'Submit for Review'}
          </button>
          
          {uploadedFile && (
            <div className="file-info">
              <p>File: {uploadedFile.name}</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
        
        {review && (
          <div className="review-results">
            <h2>Code Review Results</h2>
            <div className="review-content">
              {renderFormattedReview()}
            </div>
          </div>
        )}
      </div>
      
      {showUploadModal && (
        <div className="upload-modal-backdrop">
          <div className="upload-modal">
            <h3>Upload Code File</h3>
            <p>Select a file from your computer to review</p>
            <input 
              type="file" 
              onChange={handleFileUpload}
              accept=".js,.py,.java,.cs,.cpp,.c,.php,.rb,.go,.ts,.swift,.kt,.rs,.html,.css,.sql,.jsx,.tsx"
            />
            <div className="modal-buttons">
              <button onClick={() => setShowUploadModal(false)}>Cancel</button>
              <button className="primary" onClick={() => document.querySelector('input[type="file"]').click()}>
                Choose File
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer>
        <p>© 2025 CodeGuardian. Empowering developers with AI-enhanced code reviews.</p>
      </footer>
    </div>
    </>
  );
};

export default CReview;