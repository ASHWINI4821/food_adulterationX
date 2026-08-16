-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. FOODS
CREATE TABLE foods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    category TEXT,
    description TEXT,
    common_tests JSONB DEFAULT '[]'::jsonb,
    common_adulterants JSONB DEFAULT '[]'::jsonb,
    regulatory_sources JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ADULTERANTS
CREATE TABLE adulterants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    affected_foods JSONB DEFAULT '[]'::jsonb,
    detection_methods JSONB DEFAULT '[]'::jsonb,
    units JSONB DEFAULT '[]'::jsonb,
    health_concerns JSONB DEFAULT '[]'::jsonb,
    severity TEXT CHECK (severity IN ('LOW', 'MODERATE', 'HIGH', 'UNKNOWN')),
    regulatory_references JSONB DEFAULT '[]'::jsonb,
    source_references JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SAMPLES
CREATE TABLE samples (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    sample_id TEXT UNIQUE NOT NULL,
    food_id UUID REFERENCES foods(id) ON DELETE SET NULL,
    food_name TEXT NOT NULL,
    brand TEXT,
    batch_number TEXT,
    collection_date DATE,
    location TEXT,
    notes TEXT,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ANALYZING', 'COMPLETED', 'FAILED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_samples_user_id ON samples(user_id);
CREATE INDEX idx_samples_food_id ON samples(food_id);
CREATE INDEX idx_samples_status ON samples(status);
CREATE INDEX idx_samples_created_at ON samples(created_at);

-- 5. TEST RESULTS
CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sample_id UUID REFERENCES samples(id) ON DELETE CASCADE,
    test_type TEXT CHECK (test_type IN ('QUALITATIVE', 'QUANTITATIVE')),
    test_name TEXT NOT NULL,
    test_result TEXT, -- For qualitative: Positive, Negative, Suspected, Not Detected
    parameter TEXT,
    measured_value NUMERIC,
    unit TEXT,
    detection_limit NUMERIC,
    method TEXT,
    laboratory_name TEXT,
    test_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_test_results_sample_id ON test_results(sample_id);

-- 6. ANALYSIS RESULTS
CREATE TABLE analysis_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sample_id UUID REFERENCES samples(id) ON DELETE CASCADE,
    predicted_adulterant TEXT,
    confidence NUMERIC,
    evidence TEXT,
    risk_level TEXT CHECK (risk_level IN ('LOW', 'MODERATE', 'HIGH', 'UNKNOWN')),
    risk_explanation TEXT,
    regulatory_status TEXT CHECK (regulatory_status IN ('WITHIN LIMIT', 'ABOVE LIMIT', 'NO APPLICABLE STANDARD', 'NOT CHECKED')),
    recommendation TEXT,
    is_demo BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_analysis_results_sample_id ON analysis_results(sample_id);

-- 7. REGULATORY STANDARDS
CREATE TABLE regulatory_standards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    food_id UUID REFERENCES foods(id) ON DELETE CASCADE,
    adulterant_id UUID REFERENCES adulterants(id) ON DELETE CASCADE,
    parameter TEXT NOT NULL,
    limit_value NUMERIC,
    unit TEXT,
    standard_type TEXT,
    jurisdiction TEXT,
    source TEXT,
    effective_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. HEALTH INFORMATION
CREATE TABLE health_information (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    substance TEXT NOT NULL,
    health_effects JSONB DEFAULT '[]'::jsonb,
    exposure_context TEXT,
    population_considerations TEXT,
    source TEXT,
    source_url TEXT,
    last_reviewed DATE,
    review_status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. REFERENCES
CREATE TABLE references_table (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    organization TEXT,
    url TEXT,
    description TEXT,
    source_type TEXT,
    last_verified DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. LABORATORY REPORTS
CREATE TABLE laboratory_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sample_id UUID REFERENCES samples(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    file_type TEXT,
    file_size BIGINT,
    ocr_status TEXT DEFAULT 'PENDING' CHECK (ocr_status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
    ocr_text TEXT,
    review_status TEXT DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. REPORTS (Generated PDF Reports)
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sample_id UUID REFERENCES samples(id) ON DELETE CASCADE,
    analysis_id UUID REFERENCES analysis_results(id) ON DELETE CASCADE,
    report_id TEXT UNIQUE NOT NULL,
    storage_path TEXT NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE adulterants ENABLE ROW LEVEL SECURITY;
ALTER TABLE samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulatory_standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE references_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE laboratory_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Profile Policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- Publicly readable data (Foods, Adulterants, Standards, Health Info, References)
CREATE POLICY "Anyone can view foods" ON foods FOR SELECT USING (true);
CREATE POLICY "Anyone can view adulterants" ON adulterants FOR SELECT USING (true);
CREATE POLICY "Anyone can view regulatory standards" ON regulatory_standards FOR SELECT USING (true);
CREATE POLICY "Anyone can view health information" ON health_information FOR SELECT USING (true);
CREATE POLICY "Anyone can view references" ON references_table FOR SELECT USING (true);

-- Sample Policies
CREATE POLICY "Users can view their own samples" ON samples FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own samples" ON samples FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own samples" ON samples FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all samples" ON samples FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- Test Results Policies
CREATE POLICY "Users can view test results of their samples" ON test_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM samples WHERE samples.id = test_results.sample_id AND samples.user_id = auth.uid())
);
CREATE POLICY "Users can insert test results for their samples" ON test_results FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM samples WHERE samples.id = test_results.sample_id AND samples.user_id = auth.uid())
);
CREATE POLICY "Users can update test results for their samples" ON test_results FOR UPDATE USING (
  EXISTS (SELECT 1 FROM samples WHERE samples.id = test_results.sample_id AND samples.user_id = auth.uid())
);
CREATE POLICY "Admins can view all test results" ON test_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- Analysis Results Policies
CREATE POLICY "Users can view analysis of their samples" ON analysis_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM samples WHERE samples.id = analysis_results.sample_id AND samples.user_id = auth.uid())
);
CREATE POLICY "Users can insert analysis for their samples" ON analysis_results FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM samples WHERE samples.id = analysis_results.sample_id AND samples.user_id = auth.uid())
);
CREATE POLICY "Admins can view all analysis results" ON analysis_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- Laboratory Reports Policies
CREATE POLICY "Users can view their own lab reports" ON laboratory_reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM samples WHERE samples.id = laboratory_reports.sample_id AND samples.user_id = auth.uid())
);
CREATE POLICY "Users can insert their own lab reports" ON laboratory_reports FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM samples WHERE samples.id = laboratory_reports.sample_id AND samples.user_id = auth.uid())
);
CREATE POLICY "Admins can view all lab reports" ON laboratory_reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- Reports Policies
CREATE POLICY "Users can view their generated reports" ON reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM samples WHERE samples.id = reports.sample_id AND samples.user_id = auth.uid())
);
CREATE POLICY "Users can insert their generated reports" ON reports FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM samples WHERE samples.id = reports.sample_id AND samples.user_id = auth.uid())
);
CREATE POLICY "Admins can view all generated reports" ON reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'ADMIN')
);
