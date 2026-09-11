import { useState, useRef, useEffect } from 'react';

interface Props {
  onNavigate: (page: 'corporate' | 'terminal' | 'narrative' | 'cipher' | 'final') => void;
  discoveredClues: string[];
  addClue: (clue: string) => void;
}

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

export default function SecretTerminal({ onNavigate, addClue }: Props) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: '╔══════════════════════════════════════════╗', type: 'system' },
    { text: '║  MERIDIAN INTERNAL SYSTEM v3.7.1         ║', type: 'system' },
    { text: '║  CLASSIFIED TERMINAL - LEVEL 5 ACCESS    ║', type: 'system' },
    { text: '╚══════════════════════════════════════════╝', type: 'system' },
    { text: '', type: 'output' },
    { text: 'System initialized. Last login: 03/15/1998 03:33:33 AM', type: 'output' },
    { text: 'User: GUEST (limited access)', type: 'output' },
    { text: '', type: 'output' },
    { text: 'Type "help" for available commands.', type: 'system' },
    { text: '', type: 'output' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = (text: string, type: TerminalLine['type'] = 'output') => {
    setLines(prev => [...prev, { text, type }]);
  };

  const addLines = (newLines: TerminalLine[]) => {
    setLines(prev => [...prev, ...newLines]);
  };

  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    addLine(`> ${cmd}`, 'input');

    switch (command) {
      case 'help':
        addLines([
          { text: 'Available commands:', type: 'system' },
          { text: '  help        - Show this message', type: 'output' },
          { text: '  status      - System status', type: 'output' },
          { text: '  users       - List active users', type: 'output' },
          { text: '  files       - Browse file system', type: 'output' },
          { text: '  read <file> - Read a file', type: 'output' },
          { text: '  echo <msg>  - Echo a message', type: 'output' },
          { text: '  protocol7   - [ACCESS RESTRICTED]', type: 'output' },
          { text: '  clear       - Clear terminal', type: 'output' },
          { text: '  exit        - Return to site', type: 'output' },
        ]);
        break;

      case 'status':
        addLines([
          { text: 'SYSTEM STATUS REPORT', type: 'system' },
          { text: '─────────────────────', type: 'output' },
          { text: 'CPU: 23% | Memory: 847MB/1024MB', type: 'output' },
          { text: 'Network: CONNECTED (internal)', type: 'output' },
          { text: 'Firewall: ACTIVE', type: 'output' },
          { text: 'Alerts: 3 UNREAD', type: 'error' },
          { text: '', type: 'output' },
          { text: '⚠️  WARNING: Unauthorized access detected on Server 7', type: 'error' },
          { text: '⚠️  WARNING: File integrity check failed - /data/echo/', type: 'error' },
          { text: '⚠️  WARNING: User "admin" attempted login from unknown IP', type: 'error' },
        ]);
        addClue('terminal_status');
        break;

      case 'users':
        addLines([
          { text: 'REGISTERED USERS:', type: 'system' },
          { text: '─────────────────', type: 'output' },
          { text: '1. j.mitchell    [ADMIN]    - Last: 01/12/1998', type: 'output' },
          { text: '2. s.chen        [LEVEL 5]  - Last: 03/14/1998', type: 'output' },
          { text: '3. r.kaine       [LEVEL 5]  - Last: 03/15/1998', type: 'output' },
          { text: '4. ████████      [LEVEL 7]  - Last: 03/15/1998 03:33', type: 'error' },
          { text: '   STATUS: ACCOUNT SUSPENDED - REASON: CLASSIFIED', type: 'error' },
          { text: '5. guest         [GUEST]    - Last: NOW', type: 'output' },
        ]);
        break;

      case 'files':
        addLines([
          { text: 'FILE SYSTEM BROWSER', type: 'system' },
          { text: '───────────────────', type: 'output' },
          { text: '/public/          - Public documents', type: 'output' },
          { text: '/data/            - Research data', type: 'output' },
          { text: '/data/echo/       - [ACCESS DENIED - LEVEL 7 REQUIRED]', type: 'error' },
          { text: '/data/signal/     - [ACCESS DENIED - LEVEL 7 REQUIRED]', type: 'error' },
          { text: '/logs/            - System logs', type: 'output' },
          { text: '/logs/access.log  - Access log', type: 'output' },
          { text: '/logs/echo.log    - [ENCRYPTED]', type: 'error' },
          { text: '/secret/          - [HIDDEN PARTITION]', type: 'error' },
        ]);
        addClue('terminal_files');
        break;

      case 'read access.log':
        addLines([
          { text: 'ACCESS LOG - Last 10 entries:', type: 'system' },
          { text: '─────────────────────────────', type: 'output' },
          { text: '[03/15/1998 03:33:31] LOGIN FAILED - user: ████████ - IP: 10.0.7.83', type: 'output' },
          { text: '[03/15/1998 03:33:32] LOGIN FAILED - user: ████████ - IP: 10.0.7.83', type: 'output' },
          { text: '[03/15/1998 03:33:33] LOGIN SUCCESS - user: ████████ - IP: 10.0.7.83', type: 'success' },
          { text: '[03/15/1998 03:33:33] FILE ACCESS: /data/echo/final_transmission.dat', type: 'output' },
          { text: '[03/15/1998 03:33:34] FILE COPIED: /data/echo/final_transmission.dat → /external/', type: 'output' },
          { text: '[03/15/1998 03:33:35] ALERT: Unauthorized external transfer detected', type: 'error' },
          { text: '[03/15/1998 03:33:36] ACCOUNT LOCKED: ████████', type: 'error' },
          { text: '[03/15/1998 03:33:37] SYSTEM NOTE: "They can\'t stop the signal."', type: 'system' },
          { text: '[03/15/1998 03:33:38] CONNECTION TERMINATED', type: 'error' },
        ]);
        addClue('access_log');
        break;

      case 'read echo.log':
        addLines([
          { text: 'DECRYPTING... requires cipher key...', type: 'system' },
          { text: '', type: 'output' },
          { text: 'Partial decode (no key):', type: 'error' },
          { text: '▓▓▓▓ ECHO PROTOCOL ▓▓▓▓', type: 'error' },
          { text: 'Frequency locked: 7.83 Hz (Schumann resonance)', type: 'output' },
          { text: 'Subjects connected: 1,247', type: 'output' },
          { text: 'Signal strength: ████████░░ 82%', type: 'output' },
          { text: 'WARNING: Subjects are becoming AWARE', type: 'error' },
          { text: 'WARNING: Containment breach in Sector 7', type: 'error' },
          { text: 'NOTE: Use cipher decoder with key "SCHUMANN" to decrypt full log', type: 'system' },
        ]);
        addClue('echo_log');
        break;

      case 'protocol7':
        addClue('protocol7_command');
        addLines([
          { text: '', type: 'output' },
          { text: '╔══════════════════════════════════════════════╗', type: 'error' },
          { text: '║  ⚠️  PROTOCOL 7 ACTIVATED  ⚠️                 ║', type: 'error' },
          { text: '║  CLEARANCE LEVEL: MAXIMUM                    ║', type: 'error' },
          { text: '╚══════════════════════════════════════════════╝', type: 'error' },
          { text: '', type: 'output' },
          { text: 'Loading classified files...', type: 'system' },
          { text: '████████████████████████████ 100%', type: 'success' },
          { text: '', type: 'output' },
          { text: 'PROJECT ECHO - FINAL REPORT', type: 'system' },
          { text: 'Classification: ULTRA', type: 'error' },
          { text: '', type: 'output' },
          { text: 'Project Echo was designed to map human consciousness', type: 'output' },
          { text: 'using Schumann resonance frequencies. We believed we', type: 'output' },
          { text: 'could create a network of shared awareness.', type: 'output' },
          { text: '', type: 'output' },
          { text: 'We were wrong.', type: 'error' },
          { text: '', type: 'output' },
          { text: 'The subjects didn\'t just connect to each other.', type: 'output' },
          { text: 'They connected to something ELSE.', type: 'error' },
          { text: '', type: 'output' },
          { text: 'Something that was already there. Waiting.', type: 'error' },
          { text: 'Listening at 7.83 Hz since before we existed.', type: 'error' },
          { text: '', type: 'output' },
          { text: 'The director tried to shut it down on March 15th.', type: 'output' },
          { text: 'He succeeded. But the signal... the signal continued.', type: 'output' },
          { text: '', type: 'output' },
          { text: 'It\'s still broadcasting.', type: 'error' },
          { text: 'Can you hear it?', type: 'error' },
          { text: '', type: 'output' },
          { text: '→ Type "narrative" to access the full story', type: 'system' },
          { text: '→ Type "cipher" to access the cipher decoder', type: 'system' },
        ]);
        break;

      case 'narrative':
        onNavigate('narrative');
        break;

      case 'cipher':
        onNavigate('cipher');
        break;

      case 'clear':
        setLines([]);
        break;

      case 'exit':
        onNavigate('corporate');
        break;

      default:
        if (command.startsWith('echo ')) {
          addLine(cmd.slice(5), 'output');
        } else if (command.startsWith('read ')) {
          addLine(`Error: File "${cmd.slice(5)}" not found. Try "files" to list available files.`, 'error');
        } else {
          addLine(`Command not recognized: "${command}". Type "help" for available commands.`, 'error');
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    processCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex + 1;
      if (newIndex < commandHistory.length) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        {/* Terminal header */}
        <div className="bg-gray-900 rounded-t-lg px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-400 text-sm ml-4">terminal - classified@meridian:~</span>
        </div>
        
        {/* Terminal body */}
        <div 
          ref={terminalRef}
          className="bg-gray-950 rounded-b-lg p-4 h-[70vh] overflow-y-auto border border-gray-800"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className={`text-sm leading-relaxed ${
              line.type === 'input' ? 'text-green-400' :
              line.type === 'error' ? 'text-red-400' :
              line.type === 'success' ? 'text-green-300' :
              line.type === 'system' ? 'text-cyan-400' :
              'text-gray-300'
            }`}>
              {line.text || '\u00A0'}
            </div>
          ))}
          
          {/* Input line */}
          <form onSubmit={handleSubmit} className="flex items-center mt-1">
            <span className="text-green-400 text-sm mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 text-sm outline-none caret-green-400"
              autoFocus
              spellCheck={false}
            />
          </form>
        </div>

        {/* Back button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => onNavigate('corporate')}
            className="text-gray-500 hover:text-gray-300 text-sm font-mono"
          >
            [ESC] Return to surface
          </button>
        </div>
      </div>
    </div>
  );
}
