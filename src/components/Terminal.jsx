import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const TerminalComponent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState('~');

  const handleCommand = (cmd) => {
    switch (cmd.toLowerCase()) {
      case 'help':
        return 'Available commands: help, ls, cd blogs, clear';
      case 'ls':
        return currentDirectory === '~' ? 'blogs' : 'blog1.md blog2.md blog3.md';
      case 'cd blogs':
        if (currentDirectory === '~') {
          setCurrentDirectory('~/blogs');
          return 'Changed directory to ~/blogs';
        } else {
          return 'No such directory';
        }
      case 'clear':
        setOutput([]);
        return '';
      default:
        if (cmd.startsWith('cat ') && currentDirectory === '~/blogs') {
          const blogFile = cmd.split(' ')[1];
          if (['blog1.md', 'blog2.md', 'blog3.md'].includes(blogFile)) {
            window.location.href = `/posts/${blogFile.replace('.md', '')}`;
            return 'Loading blog...';
          }
        }
        return `Command not found: ${cmd}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOutput = `${currentDirectory} $ ${input}`;
    const commandOutput = handleCommand(input);
    setOutput([...output, newOutput, commandOutput]);
    setInput('');
  };

  useEffect(() => {
    const neofetchOutput = [
      '       _,met$$$$$gg.          yourname@blog',
      '    ,g$$$$$$$$$$$$$$$P.       ----------------',
      '  ,g$$P""       """Y$$.".     OS: Astro Blog OS',
      ' ,$$P\'              `$$$.     Host: GitHub Pages',
      ',$$P       ,ggs.     `$$b:    Kernel: 5.10.0-astro',
      'd$$\'     ,$P"\'   .    $$$     Uptime: 42 days, 15 hours, 27 mins',
      '$$P      d$\'     ,    $$P     Packages: 15 (npm)',
      '$$:      $$.   -    ,d$$\'     Shell: zsh 5.8',
      '$$;      Y$b._   _,d$P\'       Resolution: 1920x1080',
      'Y$$.    `.`"Y$$$$P"\'          DE: Astro',
      '`$$b      "-.__               WM: Tailwind',
      ' `Y$$                         Theme: Dark [auto]',
      '  `Y$$.                       Icons: Lucide React',
      '    `$$b.                     Terminal: Astro Terminal',
      '      `Y$$b.                  CPU: Astro Boost 3.5 GHz',
      '        `"Y$b._               GPU: AstroForce RTX 4090',
      '            `"""              Memory: 16384MiB / 32768MiB',
      '',
      'Welcome to my Astro blog! Type "help" for available commands.'
    ];
    setOutput(neofetchOutput);
  }, []);

  return (
    <div className="bg-black text-green-500 p-4 rounded-lg font-mono text-sm h-[80vh] overflow-y-auto">
      <div className="mb-4">
        {output.map((line, index) => (
          <pre key={index}>{line}</pre>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <Terminal className="mr-2" size={18} />
        <span className="mr-2">{currentDirectory} $</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent flex-grow outline-none"
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalComponent;