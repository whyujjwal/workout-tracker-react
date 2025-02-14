import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #2A579A;
    --secondary: #4A90E2;
    --background: #F5F7FA;
    --surface: #FFFFFF;
    --text: #2C3E50;
    --success: #27AE60;
    --warning: #F39C12;
    --error: #E74C3C;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--background);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: var(--text);
  }

  button {
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
    &:hover {
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(1px);
    }
  }

  input, select {
    border: 2px solid #E0E6ED;
    border-radius: 4px;
    padding: 8px 12px;
    transition: border-color 0.2s ease;
    &:focus {
      outline: none;
      border-color: var(--secondary);
    }
  }

  table {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
`;

export default GlobalStyles;
