'use client';

import React, { useState, useCallback, useRef, useEffect, DragEvent as ReactDragEvent, ChangeEvent, createContext, useContext, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Background,
  Controls,
  MiniMap,
  NodeProps,
  Handle,
  Position,
  ReactFlowProvider,
  ReactFlowInstance,
  useReactFlow,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Database, Plus, Trash2, Download, Table, Save, Upload, Edit3, Key, Link, X, CheckCircle, ArrowLeft, Image, ChevronLeft, ChevronRight,  } from 'lucide-react';

type Attribute = {
  name: string;
  type: string;
  isPrimary: boolean;
  isForeign: boolean;
};

type TableNodeData = {
  label: string;
  attributes: Attribute[];
};

type NodeDataContextType = {
  updateNodeData: (nodeId: string, data: Partial<TableNodeData>) => void;
};


const NodeDataContext = createContext<NodeDataContextType | null>(null);

const TableNode = ({ id, data, selected }: NodeProps<TableNodeData>) => {
  const { updateNodeData } = useContext(NodeDataContext)!;
  const [tableName, setTableName] = useState(data.label);
  const [attributes, setAttributes] = useState<Attribute[]>(data.attributes);
  const [isEditingTableName, setIsEditingTableName] = useState(false);


  useEffect(() => {
    updateNodeData(id, { label: tableName, attributes });
  }, [tableName, attributes, id, updateNodeData]);

  const handleAddAttribute = () => {
    setAttributes(prev => [...prev, { name: `new_column_${prev.length}`, type: 'VARCHAR(255)', isPrimary: false, isForeign: false }]);
  };
  
  const handleAttributeChange = (index: number, field: keyof Attribute, value: string | boolean) => {
    setAttributes(prev => prev.map((attr, i) => (i === index ? { ...attr, [field]: value } : attr)));
  };

  const handleRemoveAttribute = (index: number) => {
    if (attributes.length > 1) {
      setAttributes(prev => prev.filter((_, i) => i !== index));
    }
  };

  const toggleKey = (index: number, keyType: 'isPrimary' | 'isForeign') => {
    setAttributes(prev => {
      const newAttributes = [...prev];
      const currentAttr = newAttributes[index];
      

      if (keyType === 'isPrimary' && !currentAttr.isPrimary) {
        newAttributes.forEach((attr, i) => {
          if (i !== index) attr.isPrimary = false;
        });
      }

      currentAttr[keyType] = !currentAttr[keyType];
      return newAttributes;
    });
  };

  return (
    <div className={`bg-gray-900 rounded-lg shadow-2xl border-2 transition-all duration-200 min-w-[280px] max-w-[400px] ${
      selected ? 'border-blue-400 shadow-blue-500/30' : 'border-gray-700 hover:border-blue-500'
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-blue-400 border-2 border-gray-900" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-green-400 border-2 border-gray-900" />
      <Handle type="source" position={Position.Left} className="w-3 h-3 !bg-orange-400 border-2 border-gray-900" />
      <Handle type="target" position={Position.Right} className="w-3 h-3 !bg-purple-400 border-2 border-gray-900" />
      
      <div className="bg-black text-white p-3 rounded-t-lg border-b-2 border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-blue-400" />
            {isEditingTableName ? (
              <input 
                type="text" value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                onBlur={() => setIsEditingTableName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTableName(false)}
                className="text-lg font-bold bg-gray-800 border-b border-blue-400 focus:outline-none text-white rounded-sm px-1"
                autoFocus
              />
            ) : (
              <h3 
                className="text-lg font-bold cursor-pointer hover:text-blue-400 transition-colors"
                onDoubleClick={() => setIsEditingTableName(true)}
              >
                {tableName}
              </h3>
            )}
          </div>
          <button onClick={() => setIsEditingTableName(true)} className="text-gray-400 hover:text-white transition-colors" title="Edit table name">
            <Edit3 size={14} />
          </button>
        </div>
      </div>
      
      <div className="p-2 bg-gray-900">
        <div className="space-y-1">
          {attributes.map((attr, index) => (
            <div key={index} className="flex items-center gap-2 p-1.5 bg-gray-800 rounded border border-gray-700 hover:bg-gray-750 transition-colors">
              <div className="flex-grow flex items-center gap-2">
                 <input 
                    type="text" value={attr.name}
                    onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                    className="font-semibold text-white text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-400 rounded px-1 w-full"
                    placeholder="column_name"
                  />
                  <input 
                    type="text" value={attr.type}
                    onChange={(e) => handleAttributeChange(index, 'type', e.target.value)}
                    className="font-mono text-xs text-gray-300 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-400 rounded px-1 w-full text-right"
                    placeholder="DATA_TYPE"
                  />
              </div>
              <div className="flex gap-1">
                <button onClick={() => toggleKey(index, 'isPrimary')} className={`p-1 rounded transition-colors ${attr.isPrimary ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-gray-400 hover:bg-yellow-600 hover:text-black'}`} title="Primary Key">
                  <Key size={12} />
                </button>
                <button onClick={() => toggleKey(index, 'isForeign')} className={`p-1 rounded transition-colors ${attr.isForeign ? 'bg-cyan-500 text-black' : 'bg-gray-700 text-gray-400 hover:bg-cyan-600 hover:text-black'}`} title="Foreign Key">
                  <Link size={12} />
                </button>
                {attributes.length > 1 && (
                  <button onClick={() => handleRemoveAttribute(index)} className="p-1 rounded bg-gray-700 text-gray-400 hover:bg-red-600 hover:text-white transition-colors" title="Remove Column">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleAddAttribute} className="w-full mt-2 flex items-center justify-center gap-2 p-2 text-sm text-blue-400 hover:bg-gray-800 border border-dashed border-gray-600 hover:border-blue-400 rounded transition-colors">
          <Plus size={16} /> Add Column
        </button>
      </div>
    </div>
  );
};

// --- Main Editor Component ---
const nodeTypes = { table: TableNode };
let tableIdCounter = 0;
const getTableId = () => `table_${tableIdCounter++}`;

const EditorComponent = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { setViewport, toObject } = useReactFlow();

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  
  const onConnect: OnConnect = useCallback((connection) => {
    const newEdge = { 
      ...connection, 
      animated: true, 
      type: 'smoothstep',
      style: { stroke: '#60a5fa', strokeWidth: 2 },
      markerEnd: { type: 'arrowclosed', color: '#60a5fa' },
      label: 'has relation',
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  const updateNodeData = useCallback((nodeId: string, data: Partial<TableNodeData>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  }, []);
  
  const contextValue = useMemo(() => ({ updateNodeData }), [updateNodeData]);

  const onDragOver = useCallback((event: ReactDragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: ReactDragEvent) => {
    event.preventDefault();
    if (!reactFlowWrapper.current || !reactFlowInstance) return;
    
    const type = event.dataTransfer.getData('application/reactflow');
    if (type !== 'table') return;

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    
    const newNode: Node<TableNodeData> = {
      id: getTableId(),
      type: 'table',
      position,
      data: { 
        label: `Table_${tableIdCounter}`,
        attributes: [{ name: 'id', type: 'INT', isPrimary: true, isForeign: false }],
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [reactFlowInstance]);
  
  const onDragStart = (event: ReactDragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onClear = () => {
    if (!isClearing) {
        setIsClearing(true);
        setTimeout(() => setIsClearing(false), 3000);
        return;
    }
    setNodes([]);
    setEdges([]);
    setIsClearing(false);
    // Clear saved data as well
    try {
      sessionStorage.removeItem('er-diagram-flow');
    } catch (error) {
      console.error('Error clearing saved data:', error);
    }
    showNotification('Canvas cleared.', 'success');
  };

  const onExport = () => {
    const flow = toObject();
    const dataStr = JSON.stringify(flow, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `er-diagram-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    showNotification('Diagram exported successfully!', 'success');
  };

  const onExportPNG = useCallback(() => {
    if (!reactFlowInstance) return;



    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    // Fill with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get the ReactFlow viewport element
    const viewport = document.querySelector('.react-flow__viewport');
    if (!viewport) return;

    // Use html2canvas or similar approach (simplified version)
    // For now, we'll create a simple notification
    showNotification('PNG export feature coming soon!', 'success');
    
    // In a real implementation, you would use html2canvas or similar:
    // html2canvas(viewport as HTMLElement).then(canvas => {
    //   const link = document.createElement('a');
    //   link.download = `er-diagram-${new Date().toISOString().split('T')[0]}.png`;
    //   link.href = canvas.toDataURL();
    //   link.click();
    // });
  }, [reactFlowInstance, nodes]);

  const handleFileImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const flow = JSON.parse(e.target?.result as string);
          if (flow && flow.nodes && flow.edges) {
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            setViewport({ x: flow.viewport.x, y: flow.viewport.y, zoom: flow.viewport.zoom });
            showNotification('Diagram imported successfully!', 'success');
          } else {
             showNotification('Invalid file format.', 'error');
          }
        } catch (error) {
          console.log('Error importing files:', error);
          showNotification('Error importing file.', 'error');
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    }
  };

  const onSave = () => {
    if (reactFlowInstance) {
      const flow = toObject();
      // Store in sessionStorage for persistence within the session
      try {
        sessionStorage.setItem('er-diagram-flow', JSON.stringify(flow));
        showNotification('Diagram saved successfully!', 'success');
      } catch (error) {
        console.log('Error saving diagram:', error);
        showNotification('Error saving diagram.', 'error');
      }
    }
  };

  // Auto-save functionality
  useEffect(() => {
    if (reactFlowInstance && (nodes.length > 0 || edges.length > 0)) {
      const flow = toObject();
      try {
        sessionStorage.setItem('er-diagram-flow', JSON.stringify(flow));
      } catch (error) {
        console.error('Error auto-saving:', error);
      }
    }
  }, [nodes, edges, reactFlowInstance, toObject]);

  // Load saved diagram on component mount
  useEffect(() => {
    try {
      const savedFlow = sessionStorage.getItem('er-diagram-flow');
      if (savedFlow) {
        const flow = JSON.parse(savedFlow);
        if (flow && flow.nodes && flow.edges) {
          setNodes(flow.nodes);
          setEdges(flow.edges);
          if (flow.viewport) {
            setViewport({ x: flow.viewport.x, y: flow.viewport.y, zoom: flow.viewport.zoom });
          }
          // Set the counter to avoid ID collisions
          const maxId = flow.nodes.reduce((max: number, node: Node) => {
            const match = typeof node.id === 'string' && node.id.match(/table_(\d+)/);
            return match ? Math.max(max, parseInt(match[1]) + 1) : max;
          }, 0);
          tableIdCounter = maxId;
          showNotification('Restored diagram from previous session.', 'success');
        }
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
    }
  }, [setViewport]);

  const handleBackClick = () => {
    // Navigate back or to home page
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback - could navigate to a specific route or show message
      showNotification('No previous page to navigate back to.', 'error');
    }
  };

  return (
    <NodeDataContext.Provider value={contextValue}>
      <div className="flex h-screen w-screen font-sans bg-black">
        {/* Floating Toolbar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-gray-900 border border-gray-700 rounded-lg p-2 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-4">
              <Database className="h-6 w-6 text-blue-400" />
              <h1 className="text-lg font-bold text-white">ER Diagram Editor</h1>
            </div>
            <button onClick={onSave} className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-600">
              <Save size={16} /> Save
            </button>
            <button onClick={onExport} className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-600">
              <Download size={16} /> Export
            </button>
            <button onClick={onExportPNG} className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-600">
              <Image size={16} /> PNG
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-600">
              <Upload size={16} /> Import
            </button>
            <button onClick={onClear} className={`flex items-center gap-2 px-3 py-2 text-white rounded-lg transition-colors text-sm font-medium border ${isClearing ? 'bg-yellow-600 hover:bg-yellow-700 border-yellow-500' : 'bg-gray-800 hover:bg-red-700 border-gray-600'}`}>
              <Trash2 size={16} /> {isClearing ? 'Confirm?' : 'Clear'}
            </button>
          </div>
        </div>

        {/* Sidebar Toggle Button */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 bg-gray-800 text-white p-2 rounded-r-lg border border-l-0 border-gray-600 hover:bg-gray-700 transition-colors"
          style={{ left: isSidebarCollapsed ? '0px' : '288px' }}
        >
          {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Collapsible Sidebar */}
          <aside className={`bg-gray-900 border-r border-gray-800 shadow-2xl flex flex-col transition-all duration-300 ${
            isSidebarCollapsed ? 'w-0 overflow-hidden' : 'w-72 p-6'
          }`}>
            <div className="flex flex-col h-full">
              <div className="mt-4">
                {/* Back Button in Sidebar */}
                <button onClick={handleBackClick} className="flex items-center gap-1 px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors text-xs font-medium border border-gray-600 mb-4 w-fit" title="Go Back">
                  <ArrowLeft size={12} />
                  <span>Back</span>
                </button>
                <h2 className="text-lg font-semibold text-white mb-4">Components</h2>
                <p className="text-sm text-gray-400 mb-6">Drag a table onto the canvas to start.</p>
                <div onDragStart={(event) => onDragStart(event, 'table')} draggable className="p-4 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center gap-3 cursor-grab text-gray-300 hover:bg-gray-800 hover:border-blue-500 hover:text-blue-400 transition-all duration-200 group">
                  <Table size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Database Table</span>
                </div>
              </div>
              
              {/* Instructions at bottom */}
              <div className="mt-auto mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="font-medium text-white mb-2 text-sm">Instructions</h3>
                <ul className="text-xs text-gray-400 space-y-1 leading-tight">
                  <li>• Drag tables onto canvas</li>
                  <li>• Double-click names to edit</li>
                  <li>• Connect tables via handles</li>
                  <li>• Double-click connections to label</li>
                  <li>• Use toolbar to Save/Export/Import</li>
                  <li>• Auto-saves between sessions</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Canvas */}
          <main className="flex-1 h-full" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes} edges={edges}
              onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
              onConnect={onConnect} onInit={setReactFlowInstance}
              onDrop={onDrop} onDragOver={onDragOver}
              onEdgeDoubleClick={(_, edge) => {
                const labelString = typeof edge.label === 'string' ? edge.label : '';
                const newLabel = prompt('Enter relationship label:', labelString);
                if (newLabel !== null) {
                  setEdges((eds) => eds.map(e => e.id === edge.id ? {...e, label: newLabel} : e));
                }
              }}
              nodeTypes={nodeTypes} fitView className="bg-black"
              connectionLineStyle={{ stroke: '#60a5fa', strokeWidth: 2 }}
              defaultEdgeOptions={{
                markerEnd: { type: MarkerType.ArrowClosed, color: '#9ca3af' }
              }}
            >
              <Controls className="react-flow__controls-custom"/>
              <MiniMap nodeStrokeWidth={3} zoomable pannable className="react-flow__minimap-custom"/>
              <Background color="#374151" gap={20} size={1} />
            </ReactFlow>
          </main>
        </div>
        
        {/* Notifications */}
        {notification && (
          <div className={`absolute top-20 right-5 p-4 rounded-lg shadow-2xl text-white animate-fade-in-out border ${notification.type === 'success' ? 'bg-green-800 border-green-600' : 'bg-red-800 border-red-600'}`}>
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
              <span className="font-medium">{notification.message}</span>
            </div>
          </div>
        )}

        <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileImport} style={{ display: 'none' }} />
        
        <style jsx global>{`
          .react-flow__controls-custom { 
            background-color: #1f2937; 
            border: 1px solid #4b5563; 
          }
          .react-flow__controls-custom button { 
            background-color: #ffffff !important; 
            border: 1px solid #d1d5db !important; 
            color: #1f2937 !important;
            font-weight: 500;
          }
          .react-flow__controls-custom button:hover { 
            background-color: #f3f4f6 !important; 
            border-color: #9ca3af !important;
          }
          .react-flow__controls-custom button svg {
            color: #1f2937 !important;
          }
          .react-flow__minimap-custom { 
            background-color: #1f2937; 
            border: 1px solid #4b5563; 
          }
          .react-flow__handle { 
            opacity: 0.6; 
            transition: all 0.2s ease; 
          }
          .react-flow__node:hover .react-flow__handle, .react-flow__handle:hover { 
            opacity: 1; 
            transform: scale(1.3); 
          }
          .react-flow__edge-path {
            stroke: #60a5fa;
          }
          .react-flow__edge.selected .react-flow__edge-path {
            stroke: #3b82f6;
          }
          @keyframes fade-in-out {
            0% { opacity: 0; transform: translateY(-20px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
          }
          .animate-fade-in-out { 
            animation: fade-in-out 3s ease-in-out forwards; 
          }
        `}</style>
      </div>
    </NodeDataContext.Provider>
  );
};

export default function EditorPage() {
  return (
    <ReactFlowProvider>
      <EditorComponent />
    </ReactFlowProvider>
  );
}