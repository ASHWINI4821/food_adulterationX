import React, { useEffect, useMemo, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";

/* =========================================================
   FOODGUARD AI
   Main Application
   ========================================================= */

/* =========================================================
   CONSTANTS
   ========================================================= */

const STORAGE_KEY = "foodguard_scans";

const navigation = [
  {
    title: "Overview",
    items: [
      {
        path: "/",
        label: "Dashboard",
        icon: "⌂",
      },
      {
        path: "/scanner",
        label: "Food Scanner",
        icon: "⌕",
      },
    ],
  },
  {
    title: "Analysis",
    items: [
      {
        path: "/history",
        label: "Scan History",
        icon: "◷",
      },
      {
        path: "/analytics",
        label: "Analytics",
        icon: "▥",
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        path: "/food-safety",
        label: "Food Safety",
        icon: "✓",
      },
      {
        path: "/reports",
        label: "Reports",
        icon: "▤",
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        path: "/authority",
        label: "Authority Portal",
        icon: "♙",
      },
      {
        path: "/settings",
        label: "Settings",
        icon: "⚙",
      },
    ],
  },
];

const defaultScans = [
  {
    id: "FG-1001",
    food: "Milk",
    result: "Possible Adulteration",
    adulterant: "Water / Starch",
    confidence: 94,
    risk: "High",
    date: "Today, 10:42 AM",
    status: "Detected",
  },
  {
    id: "FG-1002",
    food: "Turmeric",
    result: "Safe",
    adulterant: "None detected",
    confidence: 97,
    risk: "Low",
    date: "Yesterday, 04:18 PM",
    status: "Safe",
  },
  {
    id: "FG-1003",
    food: "Honey",
    result: "Possible Adulteration",
    adulterant: "Sugar Syrup",
    confidence: 89,
    risk: "Medium",
    date: "Yesterday, 11:25 AM",
    status: "Detected",
  },
  {
    id: "FG-1004",
    food: "Chilli Powder",
    result: "Possible Adulteration",
    adulterant: "Artificial Color",
    confidence: 91,
    risk: "High",
    date: "12 Sep 2026",
    status: "Detected",
  },
  {
    id: "FG-1005",
    food: "Rice",
    result: "Safe",
    adulterant: "None detected",
    confidence: 96,
    risk: "Low",
    date: "11 Sep 2026",
    status: "Safe",
  },
];

/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function getStoredScans() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to read scan history:", error);
    return [];
  }
}

function saveScan(scan) {
  try {
    const existing = getStoredScans();

    const updated = [scan, ...existing].slice(0, 100);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return updated;
  } catch (error) {
    console.error("Unable to save scan:", error);
    return [];
  }
}

/* =========================================================
   APP LAYOUT
   ========================================================= */

function AppLayout() {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const currentPage = useMemo(() => {
    for (const section of navigation) {
      const found = section.items.find(
        (item) => item.path === location.pathname
      );

      if (found) {
        return found;
      }
    }

    return {
      label: "FoodGuard AI",
      icon: "🛡",
    };
  }, [location.pathname]);

  useEffect(() => {
    setSidebarOpen(false);
    setNotificationsOpen(false);
    setSearch("");
  }, [location.pathname]);

  return (
    <div className="app">
      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-mark">🛡</div>

          <div className="logo-text">
            Food<span>Guard</span>
          </div>
        </div>

        <div className="logo-subtitle">
          AI Food Safety Platform
        </div>

        <nav className="sidebar-nav">
          {navigation.map((section) => (
            <div className="nav-group" key={section.title}>
              <div className="nav-section-title">
                {section.title}
              </div>

              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }
                >
                  <span className="nav-icon">{item.icon}</span>

                  <span className="nav-label">
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-ai-card">
          <div className="sidebar-ai-icon">✦</div>

          <div>
            <div className="sidebar-ai-title">
              AI Engine
            </div>

            <div className="sidebar-ai-status">
              <span className="online-dot" />
              Operational
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">FG</div>

            <div className="user-info">
              <div className="user-name">
                Food Safety Officer
              </div>

              <div className="user-role">
                Administrator
              </div>
            </div>

            <span className="user-menu">⋮</span>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MOBILE OVERLAY
          ===================================================== */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <main className="main-content">
        {/* ===================================================
            TOPBAR
            =================================================== */}

        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>

            <div className="page-heading">
              <div className="breadcrumb">
                FoodGuard AI
                <span>/</span>
                {currentPage.label}
              </div>

              <div className="page-title">
                {currentPage.label}
              </div>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <span className="search-icon">⌕</span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search anything..."
                aria-label="Search"
              />

              {search && (
                <button
                  className="search-clear"
                  onClick={() => setSearch("")}
                >
                  ×
                </button>
              )}
            </div>

            <div className="notification-wrapper">
              <button
                className="notification-btn"
                onClick={() =>
                  setNotificationsOpen(!notificationsOpen)
                }
                aria-label="Notifications"
              >
                ♧
                <span className="notification-dot" />
              </button>

              {notificationsOpen && (
                <div className="notification-panel">
                  <div className="notification-header">
                    <strong>Notifications</strong>

                    <span className="notification-count">
                      3
                    </span>
                  </div>

                  <Notification
                    icon="!"
                    title="High risk sample detected"
                    text="Milk sample requires review."
                  />

                  <Notification
                    icon="✓"
                    title="Report generated"
                    text="Food safety report is ready."
                  />

                  <Notification
                    icon="⌕"
                    title="Scan completed"
                    text="Turmeric analysis completed."
                  />
                </div>
              )}
            </div>

            <div className="topbar-avatar">FG</div>
          </div>
        </header>

        {/* ===================================================
            ROUTES
            =================================================== */}

        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/scanner" element={<Scanner />} />

          <Route path="/history" element={<History />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route
            path="/food-safety"
            element={<FoodSafety />}
          />

          <Route path="/reports" element={<Reports />} />

          <Route path="/authority" element={<Authority />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard() {
  const navigate = useNavigate();

  const [scans, setScans] = useState([]);

  useEffect(() => {
    setScans(getStoredScans());
  }, []);

  const recentScans =
    scans.length > 0 ? scans.slice(0, 5) : defaultScans;

  return (
    <div className="page-container">
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="dashboard-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-pulse" />
            AI Detection Engine Online
          </div>

          <h1>
            Protect Food.
            <br />
            <span>Protect Health.</span>
          </h1>

          <p>
            FoodGuard AI helps identify potential food
            adulteration using intelligent image analysis and
            actionable food safety insights.
          </p>

          <div className="hero-actions">
            <button
              className="btn btn-hero"
              onClick={() => navigate("/scanner")}
            >
              <span>⌕</span>
              Start Food Scan
            </button>

            <button
              className="btn btn-hero-outline"
              onClick={() => navigate("/analytics")}
            >
              View Analytics
              <span>→</span>
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />

          <div className="hero-shield">
            <span>🛡</span>
          </div>

          <div className="floating-card floating-card-one">
            <div className="floating-icon">✓</div>

            <div>
              <strong>94.6%</strong>
              <span>AI Accuracy</span>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <div className="floating-icon warning">!</div>

            <div>
              <strong>Risk Detected</strong>
              <span>Milk Sample</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATISTICS
          ===================================================== */}

      <section className="stats-grid">
        <StatCard
          icon="⌕"
          iconClass="green"
          value="1,284"
          label="Total Scans"
          change="+12.5%"
          changeType="up"
          description="vs. previous month"
        />

        <StatCard
          icon="✓"
          iconClass="blue"
          value="892"
          label="Safe Samples"
          change="+8.2%"
          changeType="up"
          description="verified samples"
        />

        <StatCard
          icon="!"
          iconClass="orange"
          value="392"
          label="Risky Samples"
          change="+4.8%"
          changeType="down"
          description="requiring attention"
        />

        <StatCard
          icon="◉"
          iconClass="purple"
          value="94.6%"
          label="AI Accuracy"
          change="+2.1%"
          changeType="up"
          description="model performance"
        />
      </section>

      {/* =====================================================
          MAIN GRID
          ===================================================== */}

      <section className="content-grid">
        {/* RECENT SCANS */}

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                Recent Scan Activity
              </div>

              <div className="card-subtitle">
                Latest food analysis results
              </div>
            </div>

            <button
              className="btn btn-secondary btn-small"
              onClick={() => navigate("/history")}
            >
              View All
            </button>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sample</th>
                  <th>Result</th>
                  <th>Confidence</th>
                  <th>Risk</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {recentScans.map((scan) => (
                  <tr key={scan.id}>
                    <td>
                      <div className="table-food">
                        <div className="food-mini-icon">
                          {getFoodEmoji(scan.food)}
                        </div>

                        <div>
                          <strong>{scan.food}</strong>

                          <small>{scan.id}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={
                          scan.result === "Safe"
                            ? "result-safe"
                            : "result-danger"
                        }
                      >
                        {scan.result}
                      </span>
                    </td>

                    <td>
                      <div className="confidence-small">
                        <div className="confidence-track">
                          <div
                            className="confidence-fill"
                            style={{
                              width: `${scan.confidence}%`,
                            }}
                          />
                        </div>

                        <strong>{scan.confidence}%</strong>
                      </div>
                    </td>

                    <td>
                      <RiskBadge risk={scan.risk} />
                    </td>

                    <td>{scan.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QUICK ACTIONS */}

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                Quick Actions
              </div>

              <div className="card-subtitle">
                Common FoodGuard operations
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="quick-actions">
              <QuickAction
                icon="⌕"
                title="Scan Food"
                description="Analyze a food sample"
                onClick={() => navigate("/scanner")}
              />

              <QuickAction
                icon="◷"
                title="History"
                description="Review previous scans"
                onClick={() => navigate("/history")}
              />

              <QuickAction
                icon="▥"
                title="Analytics"
                description="Explore safety trends"
                onClick={() => navigate("/analytics")}
              />

              <QuickAction
                icon="▤"
                title="Reports"
                description="Generate safety reports"
                onClick={() => navigate("/reports")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CHART + SYSTEM
          ===================================================== */}

      <section className="content-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                Detection Overview
              </div>

              <div className="card-subtitle">
                Food samples analyzed over the last 8 months
              </div>
            </div>

            <select className="chart-select" defaultValue="8">
              <option value="8">Last 8 months</option>
              <option value="6">Last 6 months</option>
              <option value="12">Last year</option>
            </select>
          </div>

          <div className="card-body">
            <SimpleChart />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                System Status
              </div>

              <div className="card-subtitle">
                FoodGuard platform services
              </div>
            </div>

            <span className="status status-success">
              Operational
            </span>
          </div>

          <div className="card-body">
            <StatusRow
              label="AI Detection Engine"
              value="Online"
            />

            <StatusRow
              label="Database"
              value="Connected"
            />

            <StatusRow
              label="Report Service"
              value="Online"
            />

            <StatusRow
              label="Authority Portal"
              value="Online"
            />

            <StatusRow
              label="Image Processing"
              value="Online"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   FOOD SCANNER
   ========================================================= */

function Scanner() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [preview, setPreview] = useState("");

  const [dragActive, setDragActive] = useState(false);

  const [scanning, setScanning] = useState(false);

  const [result, setResult] = useState(null);

  const [scanProgress, setScanProgress] = useState(0);

  const [scanStage, setScanStage] = useState(
    "Preparing analysis..."
  );

  const handleFile = (file) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload a JPG, PNG or WEBP image.");

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size should be less than 10 MB.");

      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const imageUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreview(imageUrl);
    setResult(null);
    setScanning(false);
    setScanProgress(0);
  };

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];

    handleFile(file);

    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    handleFile(file);
  };

  const startScan = () => {
    if (!selectedFile) {
      alert("Please select a food image first.");

      return;
    }

    setScanning(true);
    setResult(null);
    setScanProgress(0);

    const stages = [
      "Uploading food sample...",
      "Preparing image...",
      "Analyzing visual patterns...",
      "Checking adulteration indicators...",
      "Calculating confidence...",
      "Generating safety assessment...",
    ];

    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;

      setScanProgress(progress);

      const stageIndex = Math.min(
        Math.floor(progress / 17),
        stages.length - 1
      );

      setScanStage(stages[stageIndex]);

      if (progress >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          completeDemoScan();
        }, 400);
      }
    }, 100);
  };

  const completeDemoScan = () => {
    const demoResult = {
      food: detectDemoFood(selectedFile?.name),
      adulterant: "Possible Water / Starch",
      confidence: 94,
      risk: "High",
      result: "Possible Adulteration",
      recommendation:
        "The sample shows visual characteristics associated with possible adulteration. Further laboratory testing is recommended before making a final determination.",
      explanation:
        "The AI model identified image patterns that may indicate dilution or starch-based adulteration. This result is a screening assessment and should be confirmed through laboratory testing.",
      detectedAt: new Date().toLocaleString(),
    };

    const scan = {
      id: `FG-${Date.now().toString().slice(-6)}`,
      food: demoResult.food,
      result: demoResult.result,
      adulterant: demoResult.adulterant,
      confidence: demoResult.confidence,
      risk: demoResult.risk,
      date: new Date().toLocaleString(),
      status: "Detected",
    };

    saveScan(scan);

    setResult(demoResult);

    setScanning(false);
    setScanProgress(100);
  };

  const resetScanner = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(null);
    setPreview("");
    setResult(null);
    setScanning(false);
    setScanProgress(0);
    setScanStage("Preparing analysis...");
  };

  return (
    <div className="page-container">
      {/* =====================================================
          SCANNER INTRO
          ===================================================== */}

      {!result && !scanning && (
        <>
          <div className="scanner-intro">
            <div>
              <div className="section-eyebrow">
                AI-POWERED ANALYSIS
              </div>

              <h1>Food Adulteration Scanner</h1>

              <p>
                Upload a clear image of your food sample and
                let FoodGuard AI analyze it for potential
                adulteration indicators.
              </p>
            </div>

            <div className="scanner-security">
              <span>✓</span>
              Secure analysis
            </div>
          </div>

          <div className="scanner-layout">
            {/* UPLOAD CARD */}

            <div className="card scanner-upload-card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    Upload Food Sample
                  </div>

                  <div className="card-subtitle">
                    Use a clear, well-lit image
                  </div>
                </div>

                <span className="status status-success">
                  AI Ready
                </span>
              </div>

              <div className="card-body">
                {!preview ? (
                  <div
                    className={`upload-area ${dragActive ? "drag-active" : ""
                      }`}
                    onDragOver={(event) => {
                      event.preventDefault();

                      setDragActive(true);
                    }}
                    onDragLeave={() =>
                      setDragActive(false)
                    }
                    onDrop={handleDrop}
                  >
                    <div className="upload-animation">
                      <div className="upload-icon">
                        ↑
                      </div>
                    </div>

                    <div className="upload-title">
                      Drop your food image here
                    </div>

                    <div className="upload-description">
                      or choose an image from your device
                    </div>

                    <label className="btn btn-primary upload-button">
                      Choose Image

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleInputChange}
                        hidden
                      />
                    </label>

                    <div className="upload-formats">
                      JPG · PNG · WEBP · Max 10MB
                    </div>
                  </div>
                ) : (
                  <div className="preview-container">
                    <div className="preview-wrapper">
                      <img
                        src={preview}
                        alt="Selected food sample"
                        className="preview-image"
                      />

                      <div className="preview-overlay">
                        <span>Image ready for analysis</span>
                      </div>
                    </div>

                    <div className="selected-file">
                      <div className="file-icon">▧</div>

                      <div className="file-details">
                        <strong>
                          {selectedFile?.name}
                        </strong>

                        <span>
                          {formatFileSize(
                            selectedFile?.size || 0
                          )}
                        </span>
                      </div>

                      <button
                        className="remove-file"
                        onClick={resetScanner}
                      >
                        ×
                      </button>
                    </div>

                    <div className="scan-controls">
                      <button
                        className="btn btn-primary scan-button"
                        onClick={startScan}
                      >
                        <span>✦</span>
                        Analyze with AI
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* HOW IT WORKS */}

            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    How FoodGuard Works
                  </div>

                  <div className="card-subtitle">
                    Three intelligent steps
                  </div>
                </div>
              </div>

              <div className="card-body">
                <Step
                  number="01"
                  icon="↑"
                  title="Upload"
                  text="Upload a clear image of the food sample you want to test."
                />

                <Step
                  number="02"
                  icon="✦"
                  title="AI Analysis"
                  text="Our AI analyzes visual patterns and potential adulteration indicators."
                />

                <Step
                  number="03"
                  icon="✓"
                  title="Get Results"
                  text="Receive confidence scores, risk levels and safety recommendations."
                />
              </div>

              <div className="scanner-tip">
                <span>💡</span>

                <div>
                  <strong>For better results</strong>

                  <p>
                    Use good lighting and capture the food
                    sample clearly without heavy shadows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =====================================================
          SCANNING
          ===================================================== */}

      {scanning && (
        <div className="card scanning-card">
          <div className="card-body">
            <div className="scanning-header">
              <div className="section-eyebrow">
                AI ANALYSIS IN PROGRESS
              </div>

              <h2>Analyzing Your Food Sample</h2>

              <p>
                FoodGuard AI is examining the image for
                potential adulteration indicators.
              </p>
            </div>

            <div className="scanning-visual">
              <img
                src={preview}
                alt="Food being analyzed"
                className="scanning-image"
              />

              <div className="scan-grid" />

              <div className="scan-corner corner-top-left" />
              <div className="scan-corner corner-top-right" />
              <div className="scan-corner corner-bottom-left" />
              <div className="scan-corner corner-bottom-right" />

              <div className="scan-line" />

              <div className="scan-center">
                <div className="scan-center-icon">
                  ✦
                </div>
              </div>
            </div>

            <div className="scan-progress-section">
              <div className="scan-progress-info">
                <span>{scanStage}</span>

                <strong>{scanProgress}%</strong>
              </div>

              <div className="scan-progress">
                <div
                  className="scan-progress-fill"
                  style={{
                    width: `${scanProgress}%`,
                  }}
                />
              </div>
            </div>

            <div className="scan-stages">
              <ScanStage
                label="Image Processing"
                done={scanProgress >= 20}
              />

              <ScanStage
                label="Pattern Detection"
                done={scanProgress >= 45}
              />

              <ScanStage
                label="Adulteration Check"
                done={scanProgress >= 70}
              />

              <ScanStage
                label="Risk Assessment"
                done={scanProgress >= 90}
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          RESULT
          ===================================================== */}

      {result && (
        <AnalysisResult
          result={result}
          preview={preview}
          onNewScan={resetScanner}
        />
      )}
    </div>
  );
}

/* =========================================================
   ANALYSIS RESULT
   ========================================================= */

function AnalysisResult({
  result,
  preview,
  onNewScan,
}) {
  const navigate = useNavigate();

  return (
    <div className="result-page">
      <div className="result-topbar">
        <div>
          <div className="section-eyebrow">
            ANALYSIS COMPLETE
          </div>

          <h1>Food Safety Assessment</h1>

          <p>
            AI-powered screening result generated successfully.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={onNewScan}
        >
          + New Scan
        </button>
      </div>

      {/* RESULT STATUS */}

      <div
        className={`result-alert ${result.risk === "High"
          ? "result-alert-danger"
          : "result-alert-safe"
          }`}
      >
        <div className="result-alert-icon">
          {result.risk === "High" ? "!" : "✓"}
        </div>

        <div>
          <strong>{result.result}</strong>

          <p>
            The AI model detected indicators that require
            attention.
          </p>
        </div>

        <RiskBadge risk={result.risk} />
      </div>

      <div className="result-grid">
        {/* IMAGE */}

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                Analyzed Sample
              </div>

              <div className="card-subtitle">
                Original uploaded image
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="result-image-wrapper">
              <img
                src={preview}
                alt="Analyzed food"
                className="result-image"
              />

              <div className="result-image-label">
                <span>✓</span>
                AI analyzed
              </div>
            </div>

            <div className="result-food-info">
              <div className="result-label">
                Detected Food
              </div>

              <div className="result-food-name">
                {result.food}
              </div>
            </div>
          </div>
        </div>

        {/* CONFIDENCE */}

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                AI Confidence
              </div>

              <div className="card-subtitle">
                Model prediction confidence
              </div>
            </div>
          </div>

          <div className="card-body confidence-result-body">
            <div
              className="confidence-circle-large"
              style={{
                "--confidence": `${result.confidence}%`,
              }}
            >
              <div className="confidence-circle-inner">
                <strong>{result.confidence}%</strong>

                <span>Confidence</span>
              </div>
            </div>

            <div className="confidence-rating">
              <span className="confidence-star">★★★★★</span>

              <strong>High Confidence</strong>

              <p>
                The model has a strong confidence in this
                screening result.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DETECTION DETAILS */}

      <div className="content-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                Detection Details
              </div>

              <div className="card-subtitle">
                Potential adulteration identified
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="detection-detail">
              <div className="detection-detail-icon">
                !
              </div>

              <div>
                <div className="result-label">
                  Possible Adulterant
                </div>

                <div className="detection-name">
                  {result.adulterant}
                </div>

                <p className="detection-description">
                  The AI identified visual characteristics
                  that may be consistent with the presence
                  of this adulterant.
                </p>
              </div>
            </div>

            <div className="explanation-box">
              <div className="explanation-icon">✦</div>

              <div>
                <strong>AI Explanation</strong>

                <p>{result.explanation}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                Recommended Action
              </div>

              <div className="card-subtitle">
                What should you do next?
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="recommendation-box">
              <div className="recommendation-icon">
                ⚠
              </div>

              <p>{result.recommendation}</p>
            </div>

            <div className="result-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/reports")}
              >
                ▤ Generate Report
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => navigate("/authority")}
              >
                ♙ Report to Authority
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}

      <div className="result-disclaimer">
        <span>ⓘ</span>

        <p>
          <strong>Important:</strong> FoodGuard AI provides
          an initial screening assessment and does not replace
          certified laboratory testing. Results should be
          verified by appropriate food safety authorities
          before regulatory action.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   HISTORY
   ========================================================= */

function History() {
  const [scans, setScans] = useState([]);

  const [filter, setFilter] = useState("All");

  const [search, setSearch] = useState("");

  useEffect(() => {
    setScans(getStoredScans());
  }, []);

  const allScans =
    scans.length > 0 ? scans : defaultScans;

  const filteredScans = allScans.filter((scan) => {
    const matchesFilter =
      filter === "All" || scan.risk === filter;

    const query = search.toLowerCase();

    const matchesSearch =
      scan.food.toLowerCase().includes(query) ||
      scan.adulterant.toLowerCase().includes(query) ||
      scan.result.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your saved scan history?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);

    setScans([]);
  };

  return (
    <div className="page-container">
      <div className="history-header">
        <div>
          <div className="section-eyebrow">
            ANALYSIS RECORDS
          </div>

          <h1>Scan History</h1>

          <p>
            Review all previously analyzed food samples.
          </p>
        </div>

        <button
          className="btn btn-danger-outline"
          onClick={clearHistory}
        >
          Clear History
        </button>
      </div>

      <div className="history-stats">
        <MiniStat
          label="Total Scans"
          value={allScans.length}
        />

        <MiniStat
          label="Safe"
          value={
            allScans.filter(
              (scan) => scan.risk === "Low"
            ).length
          }
        />

        <MiniStat
          label="Medium Risk"
          value={
            allScans.filter(
              (scan) => scan.risk === "Medium"
            ).length
          }
        />

        <MiniStat
          label="High Risk"
          value={
            allScans.filter(
              (scan) => scan.risk === "High"
            ).length
          }
        />
      </div>

      <div className="card">
        <div className="history-toolbar">
          <div className="history-filters">
            {["All", "Low", "Medium", "High"].map(
              (item) => (
                <button
                  key={item}
                  className={`filter-button ${filter === item ? "active" : ""
                    }`}
                  onClick={() => setFilter(item)}
                >
                  {item === "All"
                    ? "All"
                    : `${item} Risk`}
                </button>
              )
            )}
          </div>

          <div className="history-search">
            <span>⌕</span>

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search samples..."
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table history-table">
            <thead>
              <tr>
                <th>Sample</th>
                <th>Result</th>
                <th>Adulterant</th>
                <th>Confidence</th>
                <th>Risk</th>
                <th>Date</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredScans.length > 0 ? (
                filteredScans.map((scan) => (
                  <tr key={scan.id}>
                    <td>
                      <div className="table-food">
                        <div className="food-mini-icon">
                          {getFoodEmoji(scan.food)}
                        </div>

                        <div>
                          <strong>{scan.food}</strong>

                          <small>{scan.id}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={
                          scan.result === "Safe"
                            ? "result-safe"
                            : "result-danger"
                        }
                      >
                        {scan.result}
                      </span>
                    </td>

                    <td>{scan.adulterant}</td>

                    <td>
                      <strong>
                        {scan.confidence}%
                      </strong>
                    </td>

                    <td>
                      <RiskBadge risk={scan.risk} />
                    </td>

                    <td>{scan.date}</td>

                    <td>
                      <button className="table-action">
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state small">
                      <div className="empty-icon">
                        ⌕
                      </div>

                      <div className="empty-title">
                        No scans found
                      </div>

                      <div className="empty-description">
                        Try changing your filters or search.
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ANALYTICS
   ========================================================= */

function Analytics() {
  return (
    <div className="page-container">
      <div className="analytics-header">
        <div>
          <div className="section-eyebrow">
            FOOD SAFETY INTELLIGENCE
          </div>

          <h1>Analytics Dashboard</h1>

          <p>
            Monitor detection trends, risk distribution and
            AI model performance.
          </p>
        </div>

        <select className="analytics-select" defaultValue="30">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      <section className="stats-grid">
        <StatCard
          icon="⌕"
          iconClass="green"
          value="1,284"
          label="Total Samples"
          change="+12%"
          changeType="up"
        />

        <StatCard
          icon="✓"
          iconClass="blue"
          value="69.5%"
          label="Safe Samples"
          change="+5%"
          changeType="up"
        />

        <StatCard
          icon="!"
          iconClass="orange"
          value="30.5%"
          label="Risk Detected"
          change="+3%"
          changeType="down"
        />

        <StatCard
          icon="◉"
          iconClass="purple"
          value="94.6%"
          label="Model Accuracy"
          change="+2%"
          changeType="up"
        />
      </section>

      <section className="analytics-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                Monthly Scan Volume
              </div>

              <div className="card-subtitle">
                Total samples analyzed
              </div>
            </div>
          </div>

          <div className="card-body">
            <SimpleChart large />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                Risk Distribution
              </div>

              <div className="card-subtitle">
                Current sample classification
              </div>
            </div>
          </div>

          <div className="card-body">
            <RiskDistribution />
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                Most Detected Adulterants
              </div>

              <div className="card-subtitle">
                Detection frequency
              </div>
            </div>
          </div>

          <div className="card-body">
            <ProgressRow
              label="Water / Starch"
              value="82%"
              width="82%"
            />

            <ProgressRow
              label="Artificial Color"
              value="67%"
              width="67%"
            />

            <ProgressRow
              label="Sugar Syrup"
              value="54%"
              width="54%"
            />

            <ProgressRow
              label="Synthetic Chemicals"
              value="31%"
              width="31%"
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                AI Performance
              </div>

              <div className="card-subtitle">
                Model quality indicators
              </div>
            </div>
          </div>

          <div className="card-body">
            <PerformanceRow
              label="Accuracy"
              value="94.6%"
            />

            <PerformanceRow
              label="Precision"
              value="93.2%"
            />

            <PerformanceRow
              label="Recall"
              value="91.8%"
            />

            <PerformanceRow
              label="F1 Score"
              value="92.5%"
            />
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              High-Risk Food Categories
            </div>

            <div className="card-subtitle">
              Categories with the highest detection rate
            </div>
          </div>
        </div>

        <div className="category-analytics">
          <CategoryBar
            emoji="🥛"
            name="Milk & Dairy"
            value="38%"
          />

          <CategoryBar
            emoji="🌶️"
            name="Spices"
            value="27%"
          />

          <CategoryBar
            emoji="🍯"
            name="Honey"
            value="19%"
          />

          <CategoryBar
            emoji="🫙"
            name="Cooking Oils"
            value="11%"
          />

          <CategoryBar
            emoji="🌾"
            name="Grains"
            value="5%"
          />
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   FOOD SAFETY
   ========================================================= */

function FoodSafety() {
  const foods = [
    {
      emoji: "🥛",
      name: "Milk",
      risk: "High",
      adulterants: "Water, starch, urea",
      description:
        "Common adulterants include water, starch and synthetic substances.",
    },
    {
      emoji: "🍯",
      name: "Honey",
      risk: "Medium",
      adulterants: "Sugar syrup",
      description:
        "Sugar syrups and other sweeteners can be used to increase volume.",
    },
    {
      emoji: "🌶️",
      name: "Chilli Powder",
      risk: "High",
      adulterants: "Artificial colors",
      description:
        "Artificial colors and cheaper fillers can be mixed with chilli powder.",
    },
    {
      emoji: "🌾",
      name: "Turmeric",
      risk: "Medium",
      adulterants: "Synthetic color",
      description:
        "Artificial coloring may be added to enhance the appearance.",
    },
    {
      emoji: "🍚",
      name: "Rice",
      risk: "Low",
      adulterants: "Foreign grains",
      description:
        "Quality issues may include foreign grains and contamination.",
    },
    {
      emoji: "🫙",
      name: "Cooking Oil",
      risk: "High",
      adulterants: "Low-cost oils",
      description:
        "Lower-cost oils may sometimes be mixed with premium edible oils.",
    },
    {
      emoji: "☕",
      name: "Coffee",
      risk: "Medium",
      adulterants: "Chicory / fillers",
      description:
        "Coffee products can contain excessive fillers or undeclared substitutes.",
    },
    {
      emoji: "🧂",
      name: "Salt",
      risk: "Low",
      adulterants: "Mineral impurities",
      description:
        "Poor quality salt may contain unwanted mineral impurities.",
    },
  ];

  return (
    <div className="page-container">
      <div className="food-safety-hero">
        <div>
          <div className="section-eyebrow">
            FOOD SAFETY KNOWLEDGE
          </div>

          <h1>Know Your Food</h1>

          <p>
            Learn about common adulteration risks, potential
            adulterants and practical food safety awareness.
          </p>
        </div>

        <div className="food-safety-hero-icon">
          🛡
        </div>
      </div>

      <div className="food-grid">
        {foods.map((food) => (
          <div className="food-card" key={food.name}>
            <div className="food-card-top">
              <div className="food-card-image">
                {food.emoji}
              </div>

              <RiskBadge risk={food.risk} />
            </div>

            <div className="food-card-content">
              <div className="food-card-title">
                {food.name}
              </div>

              <div className="food-card-adulterant">
                Common: {food.adulterants}
              </div>

              <div className="food-card-description">
                {food.description}
              </div>

              <button className="food-learn-more">
                Safety Guide
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="safety-tips-section">
        <div className="section-eyebrow">
          SMART FOOD SAFETY
        </div>

        <h2>Simple habits. Safer food.</h2>

        <div className="safety-tips">
          <SafetyTip
            icon="👁"
            title="Check Appearance"
            text="Unusual color, texture or separation can be a warning sign."
          />

          <SafetyTip
            icon="🏷"
            title="Read Labels"
            text="Check ingredients, manufacturing dates and certification information."
          />

          <SafetyTip
            icon="🧪"
            title="Test When Needed"
            text="Use professional laboratory testing when a serious concern exists."
          />

          <SafetyTip
            icon="📢"
            title="Report Risks"
            text="Report suspected adulteration to the appropriate food safety authority."
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REPORTS
   ========================================================= */

function Reports() {
  const [generated, setGenerated] = useState(false);

  const reports = [
    {
      icon: "▤",
      title: "Food Analysis Report",
      description:
        "Detailed AI analysis containing sample information, confidence, risk and recommendations.",
      status: "Ready",
    },
    {
      icon: "▥",
      title: "Monthly Safety Report",
      description:
        "Summary of food safety trends, adulteration statistics and detection patterns.",
      status: "Ready",
    },
    {
      icon: "♙",
      title: "Authority Submission",
      description:
        "Prepare a structured report for food safety authority review.",
      status: "Draft",
    },
  ];

  const generateReport = () => {
    setGenerated(true);

    setTimeout(() => {
      setGenerated(false);
    }, 2500);
  };

  return (
    <div className="page-container">
      <div className="reports-header">
        <div>
          <div className="section-eyebrow">
            DOCUMENT CENTER
          </div>

          <h1>Reports & Documentation</h1>

          <p>
            Create professional reports from FoodGuard AI
            analysis data.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={generateReport}
        >
          ▤ Generate Report
        </button>
      </div>

      {generated && (
        <div className="toast-message">
          <span>✓</span>
          Report generated successfully.
        </div>
      )}

      <div className="report-grid">
        {reports.map((report) => (
          <div className="report-card" key={report.title}>
            <div className="report-header">
              <div className="report-icon">
                {report.icon}
              </div>

              <span
                className={`status ${report.status === "Ready"
                  ? "status-success"
                  : "status-warning"
                  }`}
              >
                {report.status}
              </span>
            </div>

            <div className="report-title">
              {report.title}
            </div>

            <div className="report-description">
              {report.description}
            </div>

            <div className="report-meta">
              <span>PDF</span>
              <span>•</span>
              <span>Professional format</span>
            </div>

            <div className="report-actions">
              <button
                className="btn btn-primary btn-small"
                onClick={generateReport}
              >
                Generate
              </button>

              <button className="btn btn-secondary btn-small">
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card report-template-card">
        <div className="card-header">
          <div>
            <div className="card-title">
              Professional Report Template
            </div>

            <div className="card-subtitle">
              Preview the information included in FoodGuard
              reports.
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="report-preview">
            <div className="report-preview-header">
              <div className="report-preview-logo">
                🛡
              </div>

              <div>
                <strong>FoodGuard AI</strong>

                <span>
                  Food Safety Analysis Report
                </span>
              </div>
            </div>

            <div className="report-preview-line" />

            <div className="report-preview-grid">
              <ReportField
                label="Sample ID"
                value="FG-1028"
              />

              <ReportField
                label="Food Type"
                value="Milk"
              />

              <ReportField
                label="AI Confidence"
                value="94%"
              />

              <ReportField
                label="Risk Level"
                value="High"
              />
            </div>

            <div className="report-preview-result">
              <strong>Possible Adulteration</strong>

              <p>
                Possible Water / Starch detected based on
                AI image analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   AUTHORITY
   ========================================================= */

function Authority() {
  const [selectedCase, setSelectedCase] = useState(null);

  const cases = [
    {
      id: "FG-1028",
      food: "Milk",
      risk: "High",
      status: "Investigation",
      date: "Today",
    },
    {
      id: "FG-1027",
      food: "Honey",
      risk: "Medium",
      status: "Submitted",
      date: "Yesterday",
    },
    {
      id: "FG-1026",
      food: "Chilli Powder",
      risk: "High",
      status: "Resolved",
      date: "12 Sep 2026",
    },
    {
      id: "FG-1025",
      food: "Cooking Oil",
      risk: "High",
      status: "Investigation",
      date: "11 Sep 2026",
    },
  ];

  return (
    <div className="page-container">
      <div className="authority-banner">
        <div className="authority-banner-content">
          <div className="section-eyebrow">
            OFFICIAL FOOD SAFETY PORTAL
          </div>

          <h1>Authority Dashboard</h1>

          <p>
            Monitor suspected adulteration reports,
            investigations and food safety cases.
          </p>
        </div>

        <div className="authority-shield">
          ♙
        </div>
      </div>

      <div className="authority-grid">
        <AuthorityStat
          value="128"
          label="Reports Submitted"
          icon="▤"
        />

        <AuthorityStat
          value="46"
          label="Under Investigation"
          icon="!"
        />

        <AuthorityStat
          value="82"
          label="Resolved Cases"
          icon="✓"
        />

        <AuthorityStat
          value="17"
          label="High Risk Today"
          icon="⚠"
        />
      </div>

      <div className="card authority-table-card">
        <div className="card-header">
          <div>
            <div className="card-title">
              Reported Food Safety Cases
            </div>

            <div className="card-subtitle">
              High-priority samples and authority reports
            </div>
          </div>

          <button className="btn btn-secondary btn-small">
            Export
          </button>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Food</th>
                <th>Risk</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cases.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.id}</strong>
                  </td>

                  <td>
                    <div className="table-food">
                      <div className="food-mini-icon">
                        {getFoodEmoji(item.food)}
                      </div>

                      <strong>{item.food}</strong>
                    </div>
                  </td>

                  <td>
                    <RiskBadge risk={item.risk} />
                  </td>

                  <td>
                    <span
                      className={`status ${item.status === "Resolved"
                        ? "status-success"
                        : item.status ===
                          "Investigation"
                          ? "status-warning"
                          : "status-info"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{item.date}</td>

                  <td>
                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() =>
                        setSelectedCase(item)
                      }
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCase && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="modal-card"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <div className="section-eyebrow">
                  CASE REVIEW
                </div>

                <h2>{selectedCase.id}</h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedCase(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-case-food">
                <div className="modal-food-icon">
                  {getFoodEmoji(selectedCase.food)}
                </div>

                <div>
                  <strong>{selectedCase.food}</strong>

                  <span>
                    Suspected adulteration case
                  </span>
                </div>
              </div>

              <div className="modal-grid">
                <ReportField
                  label="Risk Level"
                  value={selectedCase.risk}
                />

                <ReportField
                  label="Status"
                  value={selectedCase.status}
                />

                <ReportField
                  label="Reported"
                  value={selectedCase.date}
                />

                <ReportField
                  label="Priority"
                  value={
                    selectedCase.risk === "High"
                      ? "Urgent"
                      : "Standard"
                  }
                />
              </div>

              <div className="modal-actions">
                <button className="btn btn-primary">
                  Update Case
                </button>

                <button className="btn btn-secondary">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SETTINGS
   ========================================================= */

function Settings() {
  const [notifications, setNotifications] =
    useState(true);

  const [emailAlerts, setEmailAlerts] =
    useState(true);

  const [autoReports, setAutoReports] =
    useState(false);

  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="page-container">
      <div className="settings-header">
        <div>
          <div className="section-eyebrow">
            SYSTEM CONFIGURATION
          </div>

          <h1>Settings</h1>

          <p>
            Manage your FoodGuard AI account and application
            preferences.
          </p>
        </div>
      </div>

      {saved && (
        <div className="toast-message">
          <span>✓</span>
          Settings saved successfully.
        </div>
      )}

      <div className="settings-layout">
        <div className="settings-menu">
          <button className="settings-menu-item active">
            General
          </button>

          <button className="settings-menu-item">
            Notifications
          </button>

          <button className="settings-menu-item">
            Security
          </button>

          <button className="settings-menu-item">
            AI Preferences
          </button>
        </div>

        <div className="settings-section">
          <div className="settings-section-header">
            <div>
              <h2>General Settings</h2>

              <p>
                Configure your FoodGuard application.
              </p>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Application Name
            </label>

            <input
              className="form-input"
              value="FoodGuard AI"
              readOnly
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Administrator Email
            </label>

            <input
              className="form-input"
              type="email"
              defaultValue="admin@foodguard.ai"
            />
          </div>

          <div className="settings-divider" />

          <div className="settings-option">
            <div>
              <strong>Push Notifications</strong>

              <p>
                Receive alerts when high-risk samples are
                detected.
              </p>
            </div>

            <Toggle
              enabled={notifications}
              onClick={() =>
                setNotifications(!notifications)
              }
            />
          </div>

          <div className="settings-option">
            <div>
              <strong>Email Alerts</strong>

              <p>
                Receive important food safety alerts by
                email.
              </p>
            </div>

            <Toggle
              enabled={emailAlerts}
              onClick={() =>
                setEmailAlerts(!emailAlerts)
              }
            />
          </div>

          <div className="settings-option">
            <div>
              <strong>Automatic Reports</strong>

              <p>
                Automatically prepare monthly food safety
                reports.
              </p>
            </div>

            <Toggle
              enabled={autoReports}
              onClick={() =>
                setAutoReports(!autoReports)
              }
            />
          </div>

          <div className="settings-divider" />

          <button
            className="btn btn-primary"
            onClick={saveSettings}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NOT FOUND
   ========================================================= */

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="card">
        <div className="empty-state">
          <div className="empty-icon">?</div>

          <div className="empty-title">
            Page Not Found
          </div>

          <div className="empty-description">
            The page you requested does not exist.
          </div>

          <button
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
   ========================================================= */

function StatCard({
  icon,
  iconClass,
  value,
  label,
  change,
  changeType,
  description,
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className={`stat-icon ${iconClass}`}>
          {icon}
        </div>

        {change && (
          <div className={`stat-change ${changeType}`}>
            <span>
              {changeType === "up" ? "↗" : "↘"}
            </span>

            {change}
          </div>
        )}
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-label">{label}</div>

      {description && (
        <div className="stat-description">
          {description}
        </div>
      )}
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button className="quick-action" onClick={onClick}>
      <div className="quick-action-icon">{icon}</div>

      <div className="quick-action-content">
        <div className="quick-action-title">
          {title}
        </div>

        <div className="quick-action-description">
          {description}
        </div>
      </div>

      <span className="quick-action-arrow">→</span>
    </button>
  );
}

function RiskBadge({ risk }) {
  const normalized = risk || "Low";

  const className =
    normalized === "High"
      ? "risk-high"
      : normalized === "Medium"
        ? "risk-medium"
        : "risk-low";

  return (
    <span className={`risk-badge ${className}`}>
      <span className="risk-dot" />

      {normalized} Risk
    </span>
  );
}

function Step({ number, icon, title, text }) {
  return (
    <div className="scanner-step">
      <div className="step-number">
        {number}
      </div>

      <div className="step-icon">
        {icon}
      </div>

      <div className="step-content">
        <strong>{title}</strong>

        <p>{text}</p>
      </div>
    </div>
  );
}

function ScanStage({ label, done }) {
  return (
    <div className={`scan-stage ${done ? "done" : ""}`}>
      <div className="scan-stage-icon">
        {done ? "✓" : "○"}
      </div>

      <span>{label}</span>
    </div>
  );
}

function StatusRow({ label, value }) {
  return (
    <div className="status-row">
      <div className="status-row-label">
        <span className="status-indicator" />

        {label}
      </div>

      <span className="status status-success">
        {value}
      </span>
    </div>
  );
}

function SimpleChart({ large = false }) {
  const values = [
    46, 61, 52, 73, 66, 82, 76, 94,
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
  ];

  return (
    <div
      className={`simple-chart ${large ? "simple-chart-large" : ""
        }`}
    >
      <div className="chart-y-axis">
        <span>100</span>
        <span>75</span>
        <span>50</span>
        <span>25</span>
        <span>0</span>
      </div>

      <div className="chart-area">
        <div className="chart-grid-lines">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="chart-bars">
          {values.map((value, index) => (
            <div
              className="chart-column"
              key={months[index]}
            >
              <div
                className="chart-bar"
                style={{
                  height: `${value}%`,
                }}
                title={`${value}%`}
              />

              <span className="chart-label">
                {months[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiskDistribution() {
  return (
    <div className="risk-distribution">
      <div className="risk-total">
        <div className="risk-total-circle">
          <strong>1,284</strong>
          <span>Samples</span>
        </div>
      </div>

      <ProgressRow
        label="Low Risk"
        value="69.5%"
        width="69.5%"
      />

      <ProgressRow
        label="Medium Risk"
        value="18.2%"
        width="18.2%"
      />

      <ProgressRow
        label="High Risk"
        value="12.3%"
        width="12.3%"
      />
    </div>
  );
}

function ProgressRow({ label, value, width }) {
  return (
    <div className="progress-row">
      <div className="progress-row-header">
        <span>{label}</span>

        <strong>{value}</strong>
      </div>

      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width,
          }}
        />
      </div>
    </div>
  );
}

function PerformanceRow({ label, value }) {
  return (
    <div className="performance-row">
      <div>
        <span>{label}</span>

        <strong>{value}</strong>
      </div>

      <div className="performance-track">
        <div
          className="performance-fill"
          style={{
            width: value,
          }}
        />
      </div>
    </div>
  );
}

function CategoryBar({
  emoji,
  name,
  value,
}) {
  return (
    <div className="category-row">
      <div className="category-name">
        <span className="category-emoji">
          {emoji}
        </span>

        <strong>{name}</strong>
      </div>

      <div className="category-track">
        <div
          className="category-fill"
          style={{
            width: value,
          }}
        />
      </div>

      <strong className="category-value">
        {value}
      </strong>
    </div>
  );
}

function SafetyTip({ icon, title, text }) {
  return (
    <div className="safety-tip">
      <div className="safety-tip-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>

        <p>{text}</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="mini-stat">
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}

function AuthorityStat({
  value,
  label,
  icon,
}) {
  return (
    <div className="authority-stat">
      <div className="authority-stat-icon">
        {icon}
      </div>

      <div className="authority-stat-content">
        <div className="authority-stat-value">
          {value}
        </div>

        <div className="authority-stat-label">
          {label}
        </div>
      </div>
    </div>
  );
}

function ReportField({ label, value }) {
  return (
    <div className="report-field">
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}

function Toggle({ enabled, onClick }) {
  return (
    <button
      className={`toggle ${enabled ? "active" : ""}`}
      onClick={onClick}
      aria-label="Toggle setting"
    >
      <span />
    </button>
  );
}

function Notification({
  icon,
  title,
  text,
}) {
  return (
    <div className="notification-item">
      <div className="notification-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>

        <p>{text}</p>
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
   ========================================================= */

function getFoodEmoji(food = "") {
  const value = food.toLowerCase();

  if (value.includes("milk")) {
    return "🥛";
  }

  if (value.includes("honey")) {
    return "🍯";
  }

  if (
    value.includes("chilli") ||
    value.includes("chili")
  ) {
    return "🌶️";
  }

  if (value.includes("turmeric")) {
    return "🌾";
  }

  if (value.includes("rice")) {
    return "🍚";
  }

  if (value.includes("oil")) {
    return "🫙";
  }

  if (value.includes("coffee")) {
    return "☕";
  }

  return "🍽️";
}

function detectDemoFood(fileName = "") {
  const value = fileName.toLowerCase();

  if (value.includes("milk")) {
    return "Milk";
  }

  if (value.includes("honey")) {
    return "Honey";
  }

  if (
    value.includes("chilli") ||
    value.includes("chili")
  ) {
    return "Chilli Powder";
  }

  if (value.includes("turmeric")) {
    return "Turmeric";
  }

  if (value.includes("rice")) {
    return "Rice";
  }

  if (value.includes("oil")) {
    return "Cooking Oil";
  }

  return "Food Sample";
}

function formatFileSize(bytes) {
  if (!bytes) {
    return "0 KB";
  }

  const units = ["Bytes", "KB", "MB", "GB"];

  const index = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  return `${(
    bytes / Math.pow(1024, index)
  ).toFixed(1)} ${units[index]}`;
}

/* =========================================================
   EXPORT
   ========================================================= */

export default function App() {
  return <AppLayout />;
}