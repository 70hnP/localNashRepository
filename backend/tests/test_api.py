from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    r = client.get('/health')
    assert r.status_code == 200

def test_register_login_run_flow():
    client.post('/api/auth/register', json={"email":"admin@test.com","password":"secret12","role":"admin"})
    login = client.post('/api/auth/login', json={"email":"admin@test.com","password":"secret12"})
    token = login.json()["access_token"]
    headers={"Authorization":f"Bearer {token}"}
    run = client.post('/api/scenarios/run', headers=headers, json={"name":"S1","feed_api":32,"sulfur_pct":1.2,"naphtha_cut":28,"diesel_cut":35})
    assert run.status_code == 200
    listed = client.get('/api/scenarios', headers=headers)
    assert listed.status_code == 200
    assert len(listed.json()) >= 1
