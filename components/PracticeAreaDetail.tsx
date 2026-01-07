import React, { useState, useMemo } from 'react';
import { Plus, Minus } from 'lucide-react';
import WidgetModal from './WidgetModal';

interface Scenario {
  id: string;
  code: string;
  title: string;
  description: string;
  agentId: string;
}

interface ScenarioCardProps {
  scenario: Scenario;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onOpenWidget: (agentId: string) => void;
}

// ScenarioCard moved outside to prevent re-mounting and state issues
const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, isExpanded, onToggle, onOpenWidget }) => {
  return (
    <div 
      className={`bg-[#2A3447]/80 backdrop-blur-md rounded-[2.5rem] border border-white/10 transition-all duration-500 overflow-hidden h-fit ${
        isExpanded ? 'ring-1 ring-white/20 shadow-2xl scale-[1.02]' : 'hover:bg-[#2A3447]/90'
      }`}
    >
      <div 
        className="p-8 flex items-start justify-between cursor-pointer" 
        onClick={() => onToggle(scenario.id)}
      >
        <div className="flex-1 pr-4">
          <span className="text-brand-orange font-bold block mb-1 text-lg">{scenario.code}</span>
          <h4 className="text-white font-bold text-xl leading-[1.1]">{scenario.title}</h4>
          
          {/* Orange line visible only when expanded */}
          <div className={`h-0.5 bg-brand-orange mt-6 transition-all duration-500 origin-left ${isExpanded ? 'w-40 opacity-100' : 'w-0 opacity-0'}`}></div>
        </div>
        
        <button className="bg-white/10 rounded-full p-2 border border-white/20 transition-all duration-300 hover:bg-white/20 shrink-0">
          {isExpanded ? (
            <Minus size={28} className="text-white" />
          ) : (
            <Plus size={28} className="text-white" />
          )}
        </button>
      </div>
      
      <div 
        className={`transition-all duration-500 ease-in-out px-8 ${
          isExpanded ? 'max-h-[500px] pb-10 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <p className="text-white/80 text-base leading-relaxed mb-10 mt-2">
          {scenario.description}
        </p>
        <div className="flex justify-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenWidget(scenario.agentId);
            }}
            className="px-14 py-2.5 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-[#1A2232] transition-all active:scale-95 shadow-lg"
          >
            Empezar
          </button>
        </div>
      </div>
    </div>
  );
};

interface PracticeAreaDetailProps {
  area: {
    id: string;
    title: React.ReactNode;
    titleText: string;
    desc: string;
    bgImage: string;
  };
  onBack: () => void;
}

const PracticeAreaDetail: React.FC<PracticeAreaDetailProps> = ({ area, onBack }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");

  // Define data for each area specifically
  const scenariosData: Record<string, { practice: Scenario[], general: Scenario[] }> = useMemo(() => ({
    // Data for "Casos clínicos y emocionales"
    'clinicos': {
      practice: [
        {
          id: "p-01",
          code: "PSC011 |",
          title: "Motivación para abandonar un hábito adictivo",
          description: "Analiza la motivación de un paciente para la materia PSC011 - Motivación y Emoción, con el objetivo de cambiar un hábito negativo que ha mantenido durante años.",
          agentId: "agent_0701k81daf3ce59secqzwtax1axn"
        },
        {
          id: "p-02",
          code: "PSC018 |",
          title: "Inestabilidad emocional",
          description: "Analiza el comportamiento de un paciente para la materia PSC018 - Psicopatología, con el propósito de detectar signos de inestabilidad emocional, impulsividad y relaciones conflictivas",
          agentId: "agent_6301k83tt4atfdcay8gjq5bg03yk"
        },
        {
          id: "p-03",
          code: "PSC023 |",
          title: "Cambios de ánimo y comportamiento impulsivo",
          description: "Evalúa episodios de euforia, irritabilidad, gastos excesivos y depresión cíclica para la materia de PSC023 - Psicopatología II.",
          agentId: "agent_1501k83x9md9fy59vg3w4v5s0ztx"
        },
        {
          id: "p-04",
          code: "PSC038 |",
          title: "Malestares físicos y preocupación constante",
          description: "Explora el caso de una mujer con dolores físicos persistentes sin causa médica aparente, para la materia de PSC038 - Psicología clínica.",
          agentId: "agent_3301k8652mqrf8897c20v4akkjsc"
        },
        {
          id: "p-05",
          code: "PSC028 |",
          title: "Problemas de sueño y tensión diaria",
          description: "Analiza el caso de un paciente para la materia PSC028 - Psicología de la salud, quien presenta insomnio, fatiga y tensión muscular, además de dificultades para seguir su tratamiento.",
          agentId: "agent_9901k84b5zwzfrdam2deh3761e85"
        },
        {
          id: "p-06",
          code: "PSC040 |",
          title: "Conflicto de identidad y malestar emocional",
          description: "Elabora un plan de intervención para la materia PSC040 - Psicoterapia general, ante una persona que presenta angustia persistente debido a un conflicto entre su orientación sexual y creencias religiosas.",
          agentId: "agent_1801k84bpajvev39ez33j3brkdjm"
        },
        {
          id: "p-07",
          code: "PSC035 |",
          title: "Dificultad para poner límites personales",
          description: "Explora el caso de una mujer adulta para la materia PSC035 - Psicología de la familia, quien experimenta culpa persistente al establecer límites con su familia, lo cual genera un patrón de sobrecuidado que afecta su bienestar.",
          agentId: "agent_4001k86j14c6ebh8ka12hz4sxkkh"
        }
      ],
      general: [
        {
          id: "g-01",
          code: "CG-1 |",
          title: "Malestar general sin causa clara",
          description: "Revisa el caso de una persona que expresa insomnio, irritabilidad y otros síntomas emocionales inespecíficos, sin una causa aparente.",
          agentId: "agent_7001k865k27af438pz02gcwzfede"
        },
        {
          id: "g-02",
          code: "CG-2 |",
          title: "Tristeza profunda y aislamiento",
          description: "Explora el caso de una persona con tristeza persistente, pérdida de interés por las actividades cotidianas, alteraciones del sueño e ideación suicida.",
          agentId: "agent_2001k84c2vz2f98tcypzptc68969"
        },
        {
          id: "g-03",
          code: "CG-3 |",
          title: "Ansiedad en el entorno escolar",
          description: "Analiza un caso en el que un paciente presenta ansiedad intensa, conductas de evitación y síntomas fisiológicos,  en contextos escolares.",
          agentId: "agent_5701k866whtpfgebrdjvqrpttz2r"
        },
        {
          id: "g-04",
          code: "CG-4 |",
          title: "Miedo a lugares concurridos",
          description: "Evalúa a un paciente que experimenta un miedo intenso en ciertos espacios analizando los síntomas físicos asociados.",
          agentId: "agent_7701k86e3ztkf0ksqjs4q0ye0cem"
        },
        {
          id: "g-05",
          code: "CG-5 |",
          title: "Problemas de concentración y frustración",
          description: "Analiza el caso de un hombre que presenta baja productividad, distracciones frecuentes, olvidos e impulsividad.",
          agentId: "agent_6601k83t25j5f9trwhzjr3qra2kr"
        },
        {
          id: "g-06",
          code: "CG-6 |",
          title: "Cansancio extremo en el trabajo",
          description: "Estudia a una mujer con agotamiento persistente, pérdida de motivación y frustración relacionada con su entorno laboral.",
          agentId: "agent_3901k83qw2jhfnx9bez535xgvyth"
        },
        {
          id: "g-07",
          code: "CG-7 |",
          title: "Preocupación excesiva por la limpieza",
          description: "Estudia a una persona con obsesiones relacionadas con la limpieza y rituales compulsivos.",
          agentId: "agent_9701k86fjk2zfmkrbvf7t4vbp6br"
        },
        {
          id: "g-08",
          code: "CG-8 |",
          title: "Reacciones intensas ante una pérdida",
          description: "Analiza el caso de un paciente que, tras una pérdida significativa, presenta síntomas emocionales intensos y prolongados.",
          agentId: "agent_1901k86g46b1fpjrz4wn0v4e5zng"
        },
        {
          id: "g-10",
          code: "CG-10 |",
          title: "Relaciones conflictivas y emociones intensas",
          description: "Trabaja con un hombre adulto que mantiene relaciones inestables y presenta miedo al abandono, impulsividad, ira descontrolada y pensamientos autolesivos.",
          agentId: "agent_9601k86gxr11fd5bzr4yy8dykaa6"
        },
        {
          id: "g-11",
          code: "CG-11 |",
          title: "Recuerdos intrusivos y alerta constante",
          description: "Evalúa a una persona que manifiesta síntomas característicos como pesadillas, hipervigilancia, evitación  y episodios disociativos.",
          agentId: "agent_0301k83psc9afnrrvv5dteattv5q"
        }
      ]
    },
    // Data for "Desarrollo y aprendizaje"
    'desarrollo': {
      practice: [
        {
          id: "dp-01",
          code: "PSC003 |",
          title: "Seguimiento al desarrollo infantil",
          description: "Interactúa con la madre de un niño de 4 años para la materia PSC003 - Conocimiento del infante, con el propósito de detectar indicadores del desarrollo o posibles señales de alerta.",
          agentId: "agent_0601k86vwdamfec86mz23jve94dg"
        },
        {
          id: "dp-02",
          code: "PSC008 |",
          title: "Conductas desafiantes en la escuela",
          description: "Entrevista a un adolescente para la materia PSC008 - Conocimiento del adolescente, con el fin de indagar en las causas de sus problemas de conducta escolar.",
          agentId: "agent_4801k86x1ggcfrtvm691r0kn5977"
        },
        {
          id: "dp-03",
          code: "PSC013 |",
          title: "Aislamiento y falta de motivación",
          description: "Dialoga con un paciente para la materia PSC013 - Conocimiento del adulto y el adulto mayor, quien se encuentra en una etapa de aislamiento social y pérdida de sentido vital.",
          agentId: "agent_4101k86xknr1erftj6knek8gnsfk"
        },
        {
          id: "dp-04",
          code: "PSC012 |",
          title: "Evaluación del desarrollo del lenguaje infantil",
          description: "Evalúa las etapas del desarrollo lingüístico de un niño para la materia PSC012 - Pensamiento y Lenguaje.",
          agentId: "agent_9801k86yav9wf4bbpphj7sv9c0hw"
        },
        {
          id: "dp-05",
          code: "PSC033 |",
          title: "Obstáculos en el proceso de enseñanza",
          description: "Detecta, en una entrevista con un docente, las principales barreras para el aprendizaje de sus estudiantes para la materia PSC033 - Psicología educativa.",
          agentId: "agent_5701k86zpf8mfd4vjz48hcc31s7k"
        },
        {
          id: "dp-06",
          code: "PSC037 |",
          title: "Preocupación por el aprendizaje infantil",
          description: "Atiende a una madre de familia para la materia PSC037 - Sistemas de educación especial, preocupada por el rechazo escolar y las dificultades lectoras de su hijo.",
          agentId: "agent_9801k8705kfne9k9pfhc014va2x3"
        },
        {
          id: "dp-07",
          code: "PSC036 |",
          title: "Dudas sobre el futuro académico",
          description: "Asesora a un estudiante con bajo rendimiento académico y dudas vocacionales para la materia PSC036 -Orientación educativa I y II .",
          agentId: "agent_6101k8718537eh4abn6qe4bqprq3"
        },
        {
          id: "dp-08",
          code: "PSC016 |",
          title: "Ajuste del método de enseñanza",
          description: "Sugiere una estrategia de enseñanza personalizada para la materia PSC016 - Aprendizaje y Memoria, con base en el estilo de aprendizaje identificado en el paciente.",
          agentId: "agent_7601k88rvna7fr89gj8f7er68mv8"
        }
      ],
      general: [
        {
          id: "dg-01",
          code: "CG-9 |",
          title: "Temor a subir de peso",
          description: "Explora el caso de una adolescente con miedo intenso a subir de peso, conductas alimentarias restrictivas y malestar emocional.",
          agentId: "agent_9901k88r9309ee29fw2wygryjx6c"
        }
      ]
    },
    // Placeholder for "Trabajo en equipo y dinámica grupal"
    'equipo': {
      practice: [],
      general: []
    },
    // Placeholder for "Neuropsicología y bases biológicas"
    'neuro': {
      practice: [],
      general: []
    },
    // Placeholder for "Investigación y teorías"
    'investigacion': {
      practice: [],
      general: []
    }
  }), []);

  // Retrieve the scenarios for the current area
  const currentScenarios = scenariosData[area.id] || { practice: [], general: [] };

  const handleToggle = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleOpenWidget = (agentId: string) => {
    setSelectedAgentId(agentId);
    setIsWidgetOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#1A2232] pb-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col justify-end pb-16 px-6 lg:px-24">
        <div className="absolute inset-0 z-0">
          <img src={area.bgImage} className="w-full h-full object-cover" alt={area.titleText} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2232] via-[#1A2232]/60 to-black/20"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[0.95]">
            {area.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
            {area.desc}
          </p>
          <button 
            onClick={onBack}
            className="px-10 py-2.5 rounded-full border border-white text-white hover:bg-white/10 transition-all font-medium active:scale-95"
          >
            Regresar
          </button>
        </div>
      </section>

      {/* Main Content Areas */}
      <div className="max-w-[1400px] mx-auto px-6 mt-32 space-y-40">
        
        {/* Section 1: Escenarios de Práctica */}
        <div>
          <h2 className="text-5xl md:text-7xl font-bold text-white text-center mb-24 tracking-tight">
            Escenarios de Práctica
          </h2>
          {currentScenarios.practice.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentScenarios.practice.map(s => (
                <ScenarioCard 
                  key={s.id} 
                  scenario={s} 
                  isExpanded={expandedId === s.id}
                  onToggle={handleToggle}
                  onOpenWidget={handleOpenWidget}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-white/50 py-10">
              <p>Próximamente</p>
            </div>
          )}
        </div>

        {/* Section 2: Escenarios de Caso General */}
        <div>
          <h2 className="text-5xl md:text-7xl font-bold text-white text-center mb-24 tracking-tight">
            Escenarios de Caso General
          </h2>
          {currentScenarios.general.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentScenarios.general.map(s => (
                <ScenarioCard 
                  key={s.id} 
                  scenario={s} 
                  isExpanded={expandedId === s.id}
                  onToggle={handleToggle}
                  onOpenWidget={handleOpenWidget}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-white/50 py-10">
              <p>Próximamente</p>
            </div>
          )}
        </div>

      </div>

      <WidgetModal 
        isOpen={isWidgetOpen} 
        onClose={() => setIsWidgetOpen(false)} 
        agentId={selectedAgentId}
      />
    </div>
  );
};

export default PracticeAreaDetail;